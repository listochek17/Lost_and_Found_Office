from django import template
import naxodki.views as views

register = template.Library()

@register.simple_tag()
def data_login():
    return views.log_data

@register.simple_tag()
def data_register():
    return views.register_data

@register.simple_tag()
def data_ver():
    return views.ver_data

@register.simple_tag()
def categories():
    return views.category_data

@register.simple_tag()
def type_data():
    return views.types_data


