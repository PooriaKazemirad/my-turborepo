import assert from "node:assert/strict"
import test from "node:test"
import {
  gaugeState,
  chartAngles,
  radarAngles,
  chartColor,
  chartNumber,
  chartValueText,
  validateChartValues,
} from "../src/lib/charts.ts"

test("RTL polar geometry reflects positions while preserving the value scale", () => {
  for (const [start, end] of [
    [180, 0],
    [90, -270],
    [0, 360],
    [210, -30],
  ]) {
    const ltr = chartAngles(start, end, "ltr")
    const rtl = chartAngles(start, end, "rtl")
    assert.deepEqual(ltr, { startAngle: start, endAngle: end })
    assert.equal(Math.abs(rtl.endAngle - rtl.startAngle), Math.abs(end - start))
    for (const fraction of [0, 0.25, 0.5, 0.72, 1]) {
      const angle =
        ((ltr.startAngle + fraction * (ltr.endAngle - ltr.startAngle)) *
          Math.PI) /
        180
      const reflected =
        ((rtl.startAngle + fraction * (rtl.endAngle - rtl.startAngle)) *
          Math.PI) /
        180
      assert.ok(Math.abs(Math.cos(angle) + Math.cos(reflected)) < 1e-10)
      assert.ok(Math.abs(Math.sin(angle) - Math.sin(reflected)) < 1e-10)
    }
    assert.deepEqual(chartAngles(rtl.startAngle, rtl.endAngle, "rtl"), ltr)
  }
})

test("radar categories keep distinct, equally spaced vertices across directions", () => {
  for (const count of [1, 2, 5, 6]) {
    const ltr = radarAngles(90, -270, count, "ltr")
    const rtl = radarAngles(90, -270, count, "rtl")
    assert.equal(ltr.startAngle, 90)
    assert.equal(rtl.startAngle, 90)
    for (let index = 0; index < count; index++) {
      const fraction = count === 1 ? 0 : index / (count - 1)
      const angle = ltr.startAngle + fraction * (ltr.endAngle - ltr.startAngle)
      assert.ok(Math.abs(angle - (90 - (index * 360) / count)) < 1e-10)
      assert.ok(
        Math.abs(
          180 -
            angle -
            (rtl.startAngle + fraction * (rtl.endAngle - rtl.startAngle))
        ) < 1e-10
      )
    }
  }
  assert.deepEqual(radarAngles(45, -45, 3, "rtl"), {
    startAngle: 135,
    endAngle: 225,
  })
})

test("gauge scaling preserves endpoints, zero, and nonzero minimums", () => {
  assert.equal(gaugeState({ value: 0 }).fraction, 0)
  assert.equal(gaugeState({ value: 100 }).fraction, 1)
  assert.equal(gaugeState({ value: 60, min: 40, max: 80 }).fraction, 0.5)
  assert.equal(gaugeState({ value: 0, min: -50, max: 50 }).fraction, 0.5)
  assert.equal(gaugeState({ value: null }).error, undefined)
})

test("gauge rejects invalid ranges and out-of-range values instead of clamping", () => {
  for (const options of [
    { value: -1 },
    { value: 101 },
    { value: NaN },
    { value: Infinity },
    { value: 50, min: 100, max: 0 },
    { value: 0, min: 0, max: 0 },
    { value: 0, min: -Number.MAX_VALUE, max: Number.MAX_VALUE },
  ])
    assert.ok(gaugeState(options).error)
})

test("gauge thresholds use inclusive upper bounds and validate their order", () => {
  const thresholds = [
    { upTo: 50, color: "success", label: "Normal" },
    { upTo: 100, color: "danger", label: "High" },
  ]
  assert.equal(gaugeState({ value: 50, thresholds }).color, "success")
  assert.equal(gaugeState({ value: 51, thresholds }).thresholdLabel, "High")
  assert.ok(
    gaugeState({ value: 50, thresholds: [...thresholds].reverse() }).error
  )
  assert.ok(
    gaugeState({ value: 50, thresholds: [{ upTo: 101, color: "danger" }] })
      .error
  )
  assert.ok(
    gaugeState({ value: 50, thresholds: [{ upTo: 0, color: "danger" }] }).error
  )
})

test("chart colors use semantic tokens and repeat the five-color palette", () => {
  assert.equal(chartColor(0), "var(--chart-1)")
  assert.equal(chartColor(5), "var(--chart-1)")
  assert.equal(chartColor(2, "success"), "var(--success)")
})

test("chart validation permits gaps and signed cartesian data, but rejects invalid values", () => {
  assert.equal(
    validateChartValues(
      [{ value: 0 }, { value: -12 }, { value: null }],
      ["value"]
    ),
    undefined
  )
  for (const value of [NaN, Infinity, -Infinity, "12"]) {
    assert.match(validateChartValues([{ value }], ["value"]), /finite numbers/)
  }
  assert.match(
    validateChartValues([{ value: -1 }], ["value"], true),
    /greater than or equal to zero/
  )
  assert.equal(validateChartValues([{ value: 0 }], ["value"], true), undefined)
  assert.equal(validateChartValues([], ["value"]), undefined)
})

test("circular values and table text preserve zero and represent missing data explicitly", () => {
  assert.equal(chartNumber(0), 0)
  assert.equal(chartNumber(undefined), 0)
  assert.equal(chartNumber(NaN), 0)
  assert.equal(chartValueText(null), "—")
  assert.equal(chartValueText(0), "0")
  assert.equal(chartValueText("Jan"), "Jan")
})
