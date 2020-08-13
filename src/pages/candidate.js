import BarChart from "../components/barChart"
import React from "react"
import styles from "./candidate.module.scss"

// TODO Hook up charts to real data
const contributions = [
  { label: "Individual", value: 500000 },
  { label: "Committee", value: 400000 },
  { label: "Self-funding", value: 14000 },
  { label: "Other", value: 8000 },
]

const expenditures = [
  { label: "Fundraising", value: 25000 },
  { label: "Media", value: 18000 },
  { label: "Administrative", value: 14000 },
  { label: "Campaign salaries", value: 4000 },
]

const breakdowns = [
  { label: "Out of State", value: 65487 },
  { label: "Within California", value: 327438 },
  { label: "Within San José", value: 301242 },
]

// TODO (#56) Create actual layout for this page
export default function Candidate() {
  return (
    <div className={styles.container}>
      <BarChart type="contributions" total={654876} rows={contributions} />
      <BarChart type="expenditures" total={383254} rows={expenditures} />
      <BarChart
        type="contributions"
        total={654876}
        rows={breakdowns}
        showPercentages
      />
    </div>
  )
}
