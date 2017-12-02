from graphene.types import datetime
import graphene
from tags.tag_type.tag_schema import TagType
from tags.tag_type.tag_funcs import TagFuncs as tf
from tags import SERVICE
import json

class TagQuery(graphene.ObjectType):
    tags_all = graphene.List(lambda: TagType)

    tags_by_ids = graphene.List(
        TagType
    )

    tag_by_id = graphene.Field(
        TagType,
        tag_id = graphene.ID()
    )

    tags_by_user = graphene.List(
        TagType,
        user_id = graphene.ID()
    )

    tag_by_user = graphene.Field(
        TagType,
        tag_id = graphene.ID(),
        user_id = graphene.ID()
    )

    tags_by_user_time = graphene.List(
        TagType,
        query = graphene.String(),
        user_id = graphene.ID(),
        limit = graphene.Int()
    )

    top_user_tags = graphene.List(
        TagType,
        user_id = graphene.ID(),
        limit = graphene.Int()
    )

    top_tags_by_time = graphene.List(
        TagType,
        user_id = graphene.ID(),
        limit = graphene.Int()
    )

    top_newest_tags = graphene.List(
        TagType,
        limit = graphene.Int()
    )

    def resolve_tags_all(self, type):
        return [TagType(tag) for tag in  tf.getAllTags()]

    def resolve_tags_by_ids(self, type, tag_ids):
        return [TagType(tf.getTagById(_id)) for _id in tag_ids]

    def resolve_tag_by_id(self, type, tag_id):
        return TagType(tf.getTagById(tag_id)[0])

    def resolve_tags_by_user(self, type, user_id):
        return [TagType(tag) for tag in tf.getTagsByUserId(user_id)]

    def resolve_tag_by_user(self, type, tag_id, user_id):
        return TagType(tf.getTagByUserId(tag_id, user_id)[0])

    def resolve_tags_by_user_time(self, type, query, user_id, limit):
        result = SERVICE.getSimilarUserTags(query, user_id)
        return [TagType(tag) for tag in result]

    def resolve_top_user_tags(self, type, user_id, limit):
        result = SERVICE.getTopUserTags(user_id, limit)
        return [TagType(tag) for tag in result]

    def resolve_top_tags_by_time(self, type, user_id, limit):
        result = SERVICE.getTopLatestTags(user_id, limit)
        return [TagType(tag) for tag in result]

    def resolve_top_newest_tags(self, type, limit):
        result = SERVICE.getTopNewestTags(limit)
        return [TagType(tag) for tag in result]
