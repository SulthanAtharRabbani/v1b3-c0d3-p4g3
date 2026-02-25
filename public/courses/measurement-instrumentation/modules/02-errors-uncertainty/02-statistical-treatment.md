---
title: Statistical Treatment of Measurement Data
readingTime: 35
difficulty: intermediate
objectives:
  - Calculate mean, median, and mode
  - Compute standard deviation and variance
  - Apply confidence intervals to measurements
  - Identify outliers using statistical methods
keyPoints:
  - Mean provides the best estimate from repeated measurements
  - Standard deviation measures the spread of measurements
  - Confidence intervals express probability of true value within range
  - Normal distribution is common for random errors
---

# Statistical Treatment of Measurement Data

When multiple measurements are made of the same quantity, random errors cause the values to scatter around the true value. Statistical methods provide tools for analyzing this scatter, estimating the true value, and expressing the uncertainty in our estimate.

## The Normal Distribution

Random measurement errors often follow a normal (Gaussian) distribution. This distribution is characterized by its bell-shaped curve, symmetric around the mean value.

### Properties of the Normal Distribution

The normal distribution is defined by two parameters:

**Mean (μ)**: The center of the distribution, which equals the true value if only random errors are present.

**Standard deviation (σ)**: A measure of the spread of the distribution. About 68% of values fall within ±1σ of the mean, 95% within ±2σ, and 99.7% within ±3σ.

The probability density function of the normal distribution is:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

### Why Normal Distribution is Common

The normal distribution arises naturally when many independent random effects combine. This is a consequence of the Central Limit Theorem, which states that the sum of many independent random variables approaches a normal distribution regardless of the distribution of individual variables.

In measurement, many small random effects (thermal noise, vibration, electromagnetic interference, etc.) combine to produce normally distributed errors.

## Measures of Central Tendency

When we have a set of repeated measurements, we need a single value that best represents the set. Several measures of central tendency are available.

### Arithmetic Mean

The arithmetic mean is the sum of all measurements divided by the number of measurements:

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$$

For measurements affected only by random errors, the mean provides the best estimate of the true value. As the number of measurements increases, the mean converges toward the true value.

### Median

The median is the middle value when measurements are arranged in order. For an odd number of measurements, it is the central value; for an even number, it is the average of the two central values.

The median is less affected by outliers than the mean and is preferred when the distribution is not symmetric.

### Mode

The mode is the most frequently occurring value. For a continuous distribution, it is the value at the peak of the probability density function.

## Measures of Dispersion

Measures of dispersion characterize how spread out the measurements are around the central value.

### Range

The range is the difference between the maximum and minimum values:

$$\text{Range} = x_{max} - x_{min}$$

The range is simple to calculate but uses only two values and is sensitive to outliers.

### Variance

The variance is the average of squared deviations from the mean:

$$s^2 = \frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}$$

Note that division by $(n-1)$ rather than $n$ gives an unbiased estimate of the population variance.

### Standard Deviation

The standard deviation is the square root of the variance:

$$s = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}$$

The standard deviation has the same units as the original measurements and is the most commonly used measure of dispersion.

### Standard Error of the Mean

The standard error of the mean (SEM) indicates how precisely the mean is known:

$$SE = \frac{s}{\sqrt{n}}$$

The SEM decreases as the number of measurements increases, reflecting the improved precision from averaging more measurements.

## Confidence Intervals

A confidence interval expresses the probability that the true value lies within a specified range around the measured mean.

### Confidence Interval for the Mean

For a normal distribution, the confidence interval for the mean is:

$$\bar{x} \pm t \cdot \frac{s}{\sqrt{n}}$$

where $t$ is the t-value from Student's t-distribution, which depends on the desired confidence level and degrees of freedom $(n-1)$.

### Common Confidence Levels

| Confidence Level | t-value (large n) |
|------------------|-------------------|
| 90% | 1.645 |
| 95% | 1.96 |
| 99% | 2.576 |

For small sample sizes, the t-value is larger to account for increased uncertainty in the estimated standard deviation.

### Interpreting Confidence Intervals

A 95% confidence interval means that if the measurement process were repeated many times, 95% of the calculated intervals would contain the true value. It does NOT mean there is a 95% probability that the true value lies within a particular interval—the true value is fixed, and the interval either contains it or does not.

## Outlier Detection

Outliers are measurements that deviate significantly from the pattern of other measurements. They may indicate gross errors or unusual phenomena.

### Chauvenet's Criterion

Chauvenet's criterion identifies outliers based on the probability of obtaining values at least as extreme as the suspected outlier. A measurement is rejected if:

$$P(|x - \bar{x}| \geq |x_{suspect} - \bar{x}|) < \frac{1}{2n}$$

This criterion ensures that a value is rejected only if its probability of occurrence is less than what would be expected for a dataset of size n.

### Grubbs' Test

Grubbs' test compares the most extreme value to the mean:

$$G = \frac{|x_{extreme} - \bar{x}|}{s}$$

If $G$ exceeds a critical value that depends on sample size and significance level, the extreme value is considered an outlier.

### Caution with Outlier Rejection

Outlier rejection should be performed carefully:
- Always investigate the cause of apparent outliers
- Document rejected values and reasons
- Be conservative—when in doubt, retain the value
- Consider whether outliers represent a real phenomenon

## Practical Example

A resistance measurement is repeated 10 times with the following results (ohms): 100.2, 99.8, 100.1, 100.4, 99.9, 100.3, 100.0, 99.7, 100.5, 100.1

**Step 1: Calculate the mean**

$$\bar{x} = \frac{1001.0}{10} = 100.1 \text{ Ω}$$

**Step 2: Calculate deviations and squared deviations**

| Value | Deviation | (Deviation)² |
|-------|-----------|--------------|
| 100.2 | 0.1 | 0.01 |
| 99.8 | -0.3 | 0.09 |
| ... | ... | ... |

Sum of squared deviations = 0.54

**Step 3: Calculate standard deviation**

$$s = \sqrt{\frac{0.54}{9}} = 0.245 \text{ Ω}$$

**Step 4: Calculate standard error**

$$SE = \frac{0.245}{\sqrt{10}} = 0.077 \text{ Ω}$$

**Step 5: Calculate 95% confidence interval**

For 9 degrees of freedom, t = 2.262

$$CI = 100.1 \pm 2.262 \times 0.077 = 100.1 \pm 0.17 \text{ Ω}$$

**Result**: The resistance is $100.1 \pm 0.17$ Ω with 95% confidence.

## Summary

Statistical methods provide tools for analyzing repeated measurements affected by random errors. The mean provides the best estimate of the true value. The standard deviation characterizes the spread of measurements. The standard error indicates the precision of the mean. Confidence intervals express the probability that the true value lies within a specified range. Outlier detection methods help identify potential gross errors.
