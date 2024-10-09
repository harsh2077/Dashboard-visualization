class Data:
    def __init__(self, end_year, intensity, sector, topic, insight, url,
                 region, start_year, impact, added, published,
                 country, relevance, pestle, source, title, likelihood):
        self.end_year = end_year
        self.intensity = intensity
        self.sector = sector
        self.topic = topic
        self.insight = insight
        self.url = url
        self.region = region
        self.start_year = start_year
        self.impact = impact
        self.added = added
        self.published = published
        self.country = country
        self.relevance = relevance
        self.pestle = pestle
        self.source = source
        self.title = title
        self.likelihood = likelihood

    def to_dict(self):
        return {
            "end_year": self.end_year,
            "intensity": self.intensity,
            "sector": self.sector,
            "topic": self.topic,
            "insight": self.insight,
            "url": self.url,
            "region": self.region,
            "start_year": self.start_year,
            "impact": self.impact,
            "added": self.added,
            "published": self.published,
            "country": self.country,
            "relevance": self.relevance,
            "pestle": self.pestle,
            "source": self.source,
            "title": self.title,
            "likelihood": self.likelihood
        }
