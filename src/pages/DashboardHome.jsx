import { useState, useEffect, useMemo } from 'react'
import { Container } from '@/components/layout/Container'
import {
  DashboardCard,
  BarChartCard,
  DoughnutChartCard,
  SearchInput,
  DataTable,
  ProgressBar,
  useToast,
} from '@/components/ui'
import {
  FiPackage,
  FiTrendingUp,
  FiDollarSign,
  FiShoppingCart,
  FiLayers,
  FiHome,
} from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import { getAllStockAndroid, getAllUsedAndUnusedTag } from '@/api/dashboard'

const PIE_COLORS = [
  'var(--color-primary)',
  'var(--color-success)',
  'var(--color-error)',
  'var(--color-warning)',
  '#00B4D8',
  '#9B59B6',
]

function parseNum(s) {
  if (s == null || s === '') return 0
  const n = parseFloat(String(s).replace(/,/g, ''))
  return Number.isFinite(n) ? n : 0
}

function useDashboardData(clientCode) {
  const [stock, setStock] = useState([])
  const [tagData, setTagData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!clientCode) {
      setStock([])
      setTagData(null)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    Promise.all([
      getAllStockAndroid(clientCode).catch((e) => {
        if (!cancelled) setError(e.message)
        return []
      }),
      getAllUsedAndUnusedTag(clientCode).catch(() => null),
    ]).then(([stockList, tags]) => {
      if (cancelled) return
      setStock(Array.isArray(stockList) ? stockList : [])
      setTagData(tags)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [clientCode])

  const computed = useMemo(() => {
    const totalItems = stock.length
    const totalWeight = stock.reduce((sum, i) => sum + parseNum(i.GrossWt), 0)
    const totalValue = stock.reduce((sum, i) => sum + parseNum(i.MRP), 0)
    const activeItems = stock.filter((i) => String(i.Status || '').toLowerCase() === 'active').length
    const soldItems = stock.filter((i) => String(i.Status || '').toLowerCase() === 'sold').length
    const counterIds = new Set(stock.map((i) => (i.CounterId != null && i.CounterId !== 0 ? i.CounterId : 'unassigned')))
    const numberOfCounter = counterIds.size

    const statusGroups = {}
    stock.forEach((i) => {
      const s = i.Status || 'Unknown'
      statusGroups[s] = (statusGroups[s] || 0) + 1
    })
    const statusDistribution = Object.entries(statusGroups).map(([name, count]) => ({ name, count }))

    const categoryGroups = {}
    stock.forEach((i) => {
      const c = i.CategoryName || 'Unknown'
      categoryGroups[c] = (categoryGroups[c] || 0) + 1
    })
    const categoryDistribution = Object.entries(categoryGroups).map(([name, value]) => ({ name, value }))

    const branchGroups = {}
    stock.forEach((i) => {
      const b = i.BranchName || String(i.BranchId ?? 'Unknown')
      branchGroups[b] = (branchGroups[b] || 0) + 1
    })
    const branchDistribution = Object.entries(branchGroups).map(([name, count]) => ({ name, count }))

    let tagUsageDistribution = []
    if (tagData != null && typeof tagData === 'object') {
      const used = tagData.Used ?? tagData.UsedCount ?? tagData.used ?? 0
      const unused = tagData.Unused ?? tagData.UnusedCount ?? tagData.unused ?? 0
      if (used > 0 || unused > 0) {
        tagUsageDistribution = [
          { name: 'Used', count: Number(used) },
          { name: 'Unused', count: Number(unused) },
        ]
      }
    }
    if (tagUsageDistribution.length === 0 && totalItems > 0) {
      tagUsageDistribution = [
        { name: 'In use', count: totalItems },
        { name: 'Available', count: Math.max(0, totalItems) },
      ]
    }

    const productGroups = {}
    stock.forEach((i) => {
      const p = i.ProductName || 'Unknown'
      productGroups[p] = (productGroups[p] || 0) + 1
    })
    const topItemsRaw = Object.entries(productGroups)
      .map(([productName, count]) => ({ productName, count }))
      .sort((a, b) => b.count - a.count)
    const topTotal = topItemsRaw.reduce((s, x) => s + x.count, 0)
    const topItems = topItemsRaw.map((r, i) => ({
      id: `top-${i + 1}`,
      rank: i + 1,
      productName: r.productName,
      count: r.count,
      share: topTotal > 0 ? (r.count / topTotal) * 100 : 0,
    }))

    const counterGroups = {}
    stock.forEach((i) => {
      const c = i.CounterName && String(i.CounterName).trim() ? i.CounterName : 'Unassigned'
      counterGroups[c] = (counterGroups[c] || 0) + 1
    })
    const counterWiseRaw = Object.entries(counterGroups)
      .map(([counterName, items]) => ({ counterName, items }))
      .sort((a, b) => b.items - a.items)
    const counterTotal = counterWiseRaw.reduce((s, x) => s + x.items, 0)
    const counterWiseStock = counterWiseRaw.map((r, i) => ({
      id: `counter-${i + 1}`,
      rank: i + 1,
      counterName: r.counterName,
      items: r.items,
      performance: counterTotal > 0 ? (r.items / counterTotal) * 100 : 0,
    }))

    const categoryTableRaw = {}
    stock.forEach((i) => {
      const c = i.CategoryName || 'Unknown'
      if (!categoryTableRaw[c]) {
        categoryTableRaw[c] = { items: 0, weight: 0, valueSum: 0, products: {} }
      }
      categoryTableRaw[c].items += 1
      categoryTableRaw[c].weight += parseNum(i.GrossWt)
      categoryTableRaw[c].valueSum += parseNum(i.MRP)
      const p = i.ProductName || ''
      categoryTableRaw[c].products[p] = (categoryTableRaw[c].products[p] || 0) + 1
    })
    const categoryTable = Object.entries(categoryTableRaw).map(([category, agg]) => {
      const topProduct = Object.entries(agg.products).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
      return {
        id: category,
        category,
        items: agg.items,
        weightG: agg.weight.toFixed(2),
        avgValue: agg.items > 0 ? (agg.valueSum / agg.items).toFixed(2) : '0.00',
        topProduct,
      }
    })

    return {
      totalItems,
      totalWeight: totalWeight.toFixed(2),
      totalValue: totalValue.toFixed(2),
      activeItems,
      soldItems,
      numberOfCounter,
      statusDistribution,
      categoryDistribution,
      branchDistribution,
      tagUsageDistribution,
      topItems,
      counterWiseStock,
      categoryTable,
    }
  }, [stock, tagData])

  return { stock, loading, error, ...computed }
}

export function DashboardHome() {
  const { clientCode } = useAuth()
  const { show: showToast } = useToast()
  const [topItemsSearch, setTopItemsSearch] = useState('')
  const [counterSearch, setCounterSearch] = useState('')

  const {
    loading,
    error,
    totalItems,
    totalWeight,
    totalValue,
    activeItems,
    soldItems,
    numberOfCounter,
    statusDistribution,
    categoryDistribution,
    branchDistribution,
    tagUsageDistribution,
    topItems,
    counterWiseStock,
    categoryTable,
  } = useDashboardData(clientCode)

  const filteredTopItems = useMemo(() => {
    if (!topItemsSearch.trim()) return topItems
    const q = topItemsSearch.trim().toLowerCase()
    return topItems.filter((r) => String(r.productName).toLowerCase().includes(q))
  }, [topItems, topItemsSearch])

  const filteredCounterWise = useMemo(() => {
    if (!counterSearch.trim()) return counterWiseStock
    const q = counterSearch.trim().toLowerCase()
    return counterWiseStock.filter((r) => String(r.counterName).toLowerCase().includes(q))
  }, [counterWiseStock, counterSearch])

  const kpiCards = [
    { title: 'Total Items', value: totalItems.toLocaleString(), icon: FiPackage, color: 'var(--color-primary)' },
    { title: 'Total Weight', value: `${Number(totalWeight).toLocaleString()}g`, icon: FiTrendingUp, color: 'var(--color-success)' },
    { title: 'Total Value', value: `₹${totalValue}`, icon: FiDollarSign, color: 'var(--color-warning)' },
    { title: 'Sold Items', value: soldItems.toLocaleString(), icon: FiShoppingCart, color: 'var(--color-error)' },
    { title: 'Active Items', value: activeItems.toLocaleString(), icon: FiLayers, color: '#9B59B6' },
    { title: 'Number of Counter', value: String(numberOfCounter), icon: FiHome, color: '#00B4D8' },
  ]

  useEffect(() => {
    if (error) showToast(error, 'error')
  }, [error, showToast])

  if (!clientCode && !loading) {
    return (
      <Container className="dash-overview">
        <div className="dash-overview-title">
          <h1>Overview</h1>
          <p>Summary of your RFID dashboard.</p>
        </div>
        <div className="dash-overview-loading">Sign in with a client account to load dashboard data.</div>
      </Container>
    )
  }

  if (loading) {
    return (
      <Container className="dash-overview">
        <div className="dash-overview-title">
          <h1>Overview</h1>
          <p>Summary of your RFID dashboard.</p>
        </div>
        <div className="dash-overview-loading">Loading…</div>
      </Container>
    )
  }

  return (
    <Container className="dash-overview">
      <div className="dash-overview-title">
        <h1>Overview</h1>
        <p>Summary of your RFID dashboard. Data from your inventory.</p>
      </div>

      <>
          <div className="dash-overview-kpis">
            {kpiCards.map((m) => (
              <DashboardCard key={m.title} title={m.title} subtitle="" className="dash-kpi-card overflow-hidden">
                <div className="dash-kpi-inner">
                  <div className="dash-kpi-value-wrap">
                    <p className="dash-kpi-value">{m.value}</p>
                  </div>
                  <span className="dash-kpi-icon" style={{ backgroundColor: m.color }}>
                    <m.icon size={20} aria-hidden />
                  </span>
                </div>
              </DashboardCard>
            ))}
          </div>

          <div className="dash-overview-charts-grid">
            <BarChartCard
              chartHeight={120}
              title="Status Distribution"
              subtitle="Overview of item status across inventory"
              data={statusDistribution}
              bars={[{ dataKey: 'count', name: 'Items Count', fill: 'var(--color-success)' }]}
              className="dash-overview-chart-card"
            />
            <DoughnutChartCard
              chartHeight={120}
              title="Category Distribution"
              subtitle="Breakdown"
              data={categoryDistribution}
              colors={PIE_COLORS}
              className="dash-overview-chart-card"
            />
            <BarChartCard
              chartHeight={120}
              title="Branch Distribution"
              subtitle="Items per branch"
              data={branchDistribution}
              bars={[{ dataKey: 'count', name: 'Items Count', fill: 'var(--color-primary)' }]}
              className="dash-overview-chart-card"
            />
            <BarChartCard
              chartHeight={120}
              title="Tag Usage Distribution"
              subtitle="Used vs Unused tags"
              data={tagUsageDistribution}
              bars={[{ dataKey: 'count', name: 'Tag Count', fill: 'var(--color-success)' }]}
              className="dash-overview-chart-card"
            />
          </div>

          <div className="dash-overview-tables">
            <DashboardCard
              title="Top Items"
              subtitle="By product count"
              className="dash-overview-table-card"
            >
              <SearchInput
                value={topItemsSearch}
                onChange={setTopItemsSearch}
                placeholder="Search products…"
                className="dash-overview-search"
              />
              <DataTable
                keyField="id"
                data={filteredTopItems}
                emptyMessage="No products"
                columns={[
                  { key: 'rank', label: 'Rank', width: '3.5rem' },
                  { key: 'productName', label: 'Product Name' },
                  { key: 'count', label: 'Count', width: '4.5rem', render: (v) => Number(v).toLocaleString() },
                  {
                    key: 'share',
                    label: 'Share',
                    width: '9rem',
                    render: (_, row) => (
                      <span className="dash-overview-share-cell">
                        <span>{row.share.toFixed(1)}%</span>
                        <ProgressBar value={row.share} max={100} variant="success" className="dash-overview-mini-progress" />
                      </span>
                    ),
                  },
                ]}
              />
            </DashboardCard>

            <DashboardCard
              title="Counter Wise Stock"
              subtitle="Items per counter"
              className="dash-overview-table-card"
            >
              <SearchInput
                value={counterSearch}
                onChange={setCounterSearch}
                placeholder="Search counters…"
                className="dash-overview-search"
              />
              <DataTable
                keyField="id"
                data={filteredCounterWise}
                emptyMessage="No counters"
                columns={[
                  { key: 'rank', label: 'Rank', width: '3.5rem' },
                  { key: 'counterName', label: 'Counter Name' },
                  { key: 'items', label: 'Items', width: '4.5rem', render: (v) => Number(v).toLocaleString() },
                  {
                    key: 'performance',
                    label: 'Performance',
                    width: '9rem',
                    render: (_, row) => (
                      <span className="dash-overview-share-cell">
                        <span>{row.performance.toFixed(0)}%</span>
                        <ProgressBar value={row.performance} max={100} variant="success" className="dash-overview-mini-progress" />
                      </span>
                    ),
                  },
                ]}
              />
            </DashboardCard>

            <DashboardCard
              title="Category Distribution"
              subtitle="Items, weight and top product by category"
              className="dash-overview-table-card"
            >
              <DataTable
                keyField="category"
                data={categoryTable}
                emptyMessage="No categories"
                columns={[
                  { key: 'category', label: 'Category' },
                  { key: 'items', label: 'Items', width: '4rem', render: (v) => Number(v).toLocaleString() },
                  { key: 'weightG', label: 'Weight (G)', width: '6rem' },
                  { key: 'avgValue', label: 'Avg. Value', width: '6rem', render: (v) => `₹${v}` },
                  { key: 'topProduct', label: 'Top Product', width: '6.5rem' },
                ]}
              />
            </DashboardCard>
          </div>
      </>
    </Container>
  )
}

