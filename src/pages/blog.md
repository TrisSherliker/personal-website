---
title: Blog
subtitle: 
permalink: /blog/
---

{%- import "list.njk" as list -%}
{{ list.details(collections.posts | reverse) }}
