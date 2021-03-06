import React from "react"
import styles from "./barChart.module.scss"

const percentFormatter = Intl.NumberFormat("en-US", { style: "percent" })
const thousandsFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
})

function formatPercent(value) {
  return percentFormatter.format(value)
}

function formatDollarsInThousands(value) {
  return thousandsFormatter.format(value)
}

function Bar({ percent, type }) {
  const colorStyle =
    type === "expenditures" ? styles.expenditures : styles.contributions
  return (
    <div className={styles.barBackground}>
      <div
        className={`${styles.bar} ${colorStyle}`}
        style={{ width: percent }}
      />
    </div>
  )
}

function Row({ label, value, total, type, showPercentages }) {
  const percent = formatPercent(value / total)
  return (
    <div className={styles.row}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>
        {showPercentages ? percent : formatDollarsInThousands(value)}
      </p>
      <div className={styles.barContainer}>
        <Bar percent={percent} type={type} />
      </div>
    </div>
  )
}

/**
 * A component to render a bar chart breaking down a candidate or measure's
 * contributions or expenditures.
 */
export default function BarChart({
  type = "contributions", // "contributions" | "expenditures"
  total, // number
  rows, // Array<{label: string, value: number}>
  showPercentages = false, // Show percentages instead of dollar values
}) {
  return (
    <div className={styles.chart}>
      {rows.map(({ label, value }) => (
        <Row
          key={label}
          label={label}
          value={value}
          total={total}
          type={type}
          showPercentages={showPercentages}
        />
      ))}
    </div>
  )
}
