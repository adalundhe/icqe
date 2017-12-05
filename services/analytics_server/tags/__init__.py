from tags.tag_type.tag_analytics.meta_analytics import QueryAnalytics
from tags.tag_type.stack_data.init_top_tags import InitTopTags

SERVICE = QueryAnalytics()

INITCOUNTDB = InitTopTags()


SERVICE.init_thresh = INITCOUNTDB.calcInitThresh()
