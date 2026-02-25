---
title: Accuracy, Precision, and Resolution
readingTime: 30
difficulty: beginner
objectives:
  - Distinguish between accuracy and precision
  - Define resolution, sensitivity, and repeatability
  - Understand the relationship between these characteristics
  - Apply these concepts to instrument selection
keyPoints:
  - Accuracy is closeness to true value
  - Precision is consistency of repeated measurements
  - Resolution is smallest detectable change
  - Sensitivity relates output change to input change
---

# Accuracy, Precision, and Resolution

Understanding the distinctions between accuracy, precision, resolution, and related characteristics is essential for selecting appropriate instruments and interpreting measurement results. These terms are often confused in everyday language but have precise technical meanings in metrology.

## Accuracy

Accuracy is the closeness of a measurement to the true value of the measurand. A measurement is accurate if it differs only slightly from the true value. However, since the true value is often unknown, accuracy is typically expressed in terms of error or uncertainty.

### Systematic Error and Accuracy

Systematic errors cause measurements to deviate from the true value in a consistent direction. An instrument that consistently reads 2% high has a systematic error of +2%. Systematic errors affect accuracy but not necessarily precision.

Accuracy can be expressed as:
- **Absolute error**: The difference between measured and true value in the units of measurement
- **Relative error**: The error expressed as a fraction or percentage of the true value
- **Accuracy class**: A classification system for instruments (e.g., Class 0.5 means ±0.5% of full scale)

### Expressing Accuracy

Instrument specifications typically express accuracy as a combination of factors:

$$\text{Accuracy} = \pm(a\% \text{ of reading} + b\% \text{ of range} + n \text{ digits})$$

For example, a digital multimeter might specify DC voltage accuracy as:
$$\pm(0.5\% \text{ of reading} + 0.1\% \text{ of range} + 2 \text{ digits})$$

This expression accounts for the gain error (percentage of reading), offset error (percentage of range), and quantization error (digits).

## Precision

Precision is the closeness of agreement between repeated measurements of the same quantity under the same conditions. A measurement is precise if repeated measurements yield similar values, regardless of whether those values are close to the true value.

### Random Error and Precision

Random errors cause measurements to scatter around a mean value. They arise from unpredictable variations in the measurement system or environment. Random errors affect precision but not necessarily accuracy.

The standard deviation of repeated measurements quantifies precision:

$$s = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}$$

where $x_i$ are individual measurements, $\bar{x}$ is the mean, and $n$ is the number of measurements.

### Accuracy vs. Precision

The distinction between accuracy and precision is often illustrated with a target analogy:

- **High accuracy, high precision**: All shots cluster tightly around the bullseye
- **High accuracy, low precision**: Shots scatter widely but average around the bullseye
- **Low accuracy, high precision**: Shots cluster tightly but away from the bullseye
- **Low accuracy, low precision**: Shots scatter widely and miss the bullseye

An instrument can be precise without being accurate (if it has a systematic error), or accurate without being precise (if random errors are large). Ideal instruments are both accurate and precise.

## Resolution

Resolution is the smallest change in the measurand that produces a detectable change in the measurement result. For digital instruments, resolution is typically one count of the least significant digit. For analog instruments, resolution is limited by the ability to distinguish adjacent scale divisions.

### Digital Resolution

A digital instrument with n digits can display values from 0 to $(10^n - 1)$ counts. For a 4½-digit display showing 0-19999 counts on a 2V range:

$$\text{Resolution} = \frac{2\text{ V}}{20000 \text{ counts}} = 0.0001\text{ V} = 100\text{ µV}$$

Higher resolution does not imply higher accuracy. An instrument might display 5.0000 volts when the actual voltage is 5.0050 volts—it has high resolution but poor accuracy.

### Analog Resolution

For analog instruments, resolution depends on:
- Scale division spacing
- Pointer width
- Observer's ability to interpolate between divisions

The resolution of an analog meter is typically estimated as half the smallest scale division, though experienced observers may achieve better resolution through interpolation.

## Sensitivity

Sensitivity is the ratio of change in output to change in input. For a linear sensor:

$$\text{Sensitivity} = \frac{\Delta \text{output}}{\Delta \text{input}}$$

A temperature sensor with sensitivity of 10 mV/°C produces 10 millivolts of output change for each degree Celsius of temperature change.

### Sensitivity vs. Resolution

Sensitivity and resolution are related but distinct concepts. Sensitivity describes how much output change results from input change. Resolution describes the smallest detectable input change.

For an instrument with output sensitivity S and output resolution $R_o$:

$$\text{Input Resolution} = \frac{R_o}{S}$$

An instrument with high sensitivity but coarse output resolution may have worse input resolution than one with lower sensitivity and finer output resolution.

## Repeatability and Reproducibility

Repeatability and reproducibility are related concepts that describe measurement consistency.

### Repeatability

Repeatability is the closeness of agreement between repeated measurements made under the same conditions:
- Same measurement procedure
- Same observer
- Same measuring instrument
- Same location
- Same conditions of use
- Short period of time

Repeatability quantifies the random error of the measurement process.

### Reproducibility

Reproducibility is the closeness of agreement between measurements made under changed conditions. Changed conditions might include:
- Different observers
- Different measuring instruments
- Different locations
- Different times

Reproducibility is typically poorer than repeatability because more sources of variation are included.

## Hysteresis

Hysteresis is the difference in measurement results when the measurand is approached from different directions. An instrument with hysteresis gives different readings for the same actual value depending on whether that value was approached from higher or lower values.

Hysteresis is common in instruments with mechanical elements, magnetic materials, or other components that exhibit memory effects. It represents a form of systematic error that depends on measurement history.

## Linearity

Linearity describes how closely the instrument's input-output relationship approximates a straight line. Perfect linearity means the output is exactly proportional to the input.

Linearity error is the maximum deviation from the ideal linear response, typically expressed as a percentage of full scale. An instrument with ±0.1% linearity deviates from ideal linear response by no more than 0.1% of full scale at any point.

## Summary

Understanding the distinctions between accuracy, precision, resolution, and related characteristics is essential for instrument selection and measurement interpretation. Accuracy describes closeness to the true value; precision describes consistency of repeated measurements. Resolution is the smallest detectable change; sensitivity relates output change to input change. These characteristics interact in ways that determine overall measurement quality.
