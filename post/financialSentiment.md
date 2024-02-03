---
title: "Financial Sentiment Analysis"
summary: "A sentiment analysis application on financial tweets using textblob"
date: "7/21"
estReadTime: "Issue 1 ⋅ 3 min read"
githubLink: "https://github.com/huilunang/social_media_stocks_reading"
liveDemoLink: "https://financial-senti-exploration.herokuapp.com"
---

<iframe width="100%" height="50%" src="https://www.youtube.com/embed/sOIRSD1MZks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Description
---
Sometimes, instead of scrolling through countless tweets, we would want a way to get critical information much quicker. This application translates the data in text (tweet) into scores that are much more comprehendible. These figures represent the sentimentality of the text.

The score scales from a range from -1 to 1:
- 1 - Most positive
- 0 - Neutral
- -1 - Most Negative

Therefore, if a tweet has a score close to 1, it would mean that the tweet is positive. With this logic to analyze financial stock information from tweets, we could quickly gather how others think about the particular stock and make prompt decisions.

## How it works
---
1. Enter a ticker of interest
2. See the details of the stock if needed
3. Explore the data plotted
4. Explore the raw data that is used

## Challenges
---
Much time was spent fiddling around with the Twitter API due to the different versions and constraints.
