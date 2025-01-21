---
title: QLFS data processing
url: /dashboard/labour-market/pipeline/
---

There are three stages to the [data processing pipeline](https://github.com/infogr8/yff-data/tree/main/scripts/labour-market), each being written in Python:

* extract: where we get a copy of the file from an appropriate source
* transform: where we convert it into a simpler form by selecting rows and filtering columns, and transforming formats to meet what we need
* prepare: where we build files which will directly drive our visualisations. These may be summarised or transposed data, or in a completely different format (e.g. JSON).

## Data sources

The sources for this data is the Labour Market Survey. These are pulled from NOMIS, via the [LMS extract in the YFF Data Pipelines repository](https://github.com/infogr8/yff-data-pipelines/blob/main/data/processed/labour-market/lms.csv).

We extract the data of interest to a [monthly rolling file](https://github.com/infogr8/yff-data/blob/main/data/labour-market/monthly-rolling.csv).

## Employment status processing

For the A06 figures, the transform script extracts the following measures from the 'People' sheet (i.e. not split by Gender)

* `JN6B`: Total not in full-time education, 16-24, SA
* `AGNJ`: Employed level not in fte, 16-24, SA
* `AGOL`: Unemployed level not in fte, 16-24, SA
* `AGPM`: Economically inactive level not in fte, 16-24, SA
* `AIWI`: Employed rate not in fte, 16-24, SA
* `AIXT`: Unemployed rate not in fte, 16-24, SA
* `AIYU`: Economically inactive rate not in fte, 16-24, SA
* `JN62`: Total in full-time education, 16-24, SA
* `AGNT`: Employed level in FTE, 16-24, SA
* `AGOU`: Unemployed level in FTE, 16-24, SA
* `AGPV`: Economivally inactive level in FTE, 16-24, SA
* `AIXB`: Employed rate in FTE, 16-24, SA
* `AIYC`: Unemployed rate in FTE, 16-24, SA
* `AIZD`: Economically inactive rate in FTE, 16-24, SA

We then select every third period starting at the most recent line to avoid overlapping quarters.
We also convert the quarter from a string to the date representing the start of the quarter (e.g. Jan-Mar 2023 is converted to a proper datetime object at 1-Jan-2023)

Finally, we save a [CSV of unemployment by education status](https://github.com/infogr8/yff-data/blob/main/data/labour-market/monthly-rolling.csv) for further processing.

## Long-term unemployment status processing

This processing is similar, with the following alterations:

We extract the levels of unemployment and unemployment over 12 months as well as the rate for both ages 16-17 and age 18-24.

* `YBVH`: Age 16 to 17 unemployed level, SA
* `YBXG`: Age 16 to 17 unemployed 6 to 12 months level, SA
* `YBXJ`: Age 16 to 17 unemployed over 12 months level, SA
* `YBXM`: Age 16 to 17 unemployed over 12 months rate, SA
* `YBVN`: Age 18 to 24 unemployed level, SA
* `YBXV`: Age 18 to 24 unemployed 6 to 12 months level, SA
* `YBXY`: Age 18 to 24 unemployed over 12 months level, SA
* `YBYB`: Age 18 to 24 unemployed over 12 months rate, SA

We convert the quarters as described above, and then combine the unemployment total and over 12 months levels across the two age ranges to come up with an aggregated figure from 16-24. We then calculate the resulting rate by simple division.

Finally, we save the last three years to a [CSV of long-term unemployment data](https://github.com/infogr8/yff-data/blob/main/data/labour-market/not_in_education.csv) as before.
