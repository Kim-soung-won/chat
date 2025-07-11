create table public.post (
  post_id bigint not null,
  title character varying not null,
  markdown_content text not null,
  created_at timestamp with time zone not null default now(),
  constraint post_pkey primary key (post_id),
  constraint post_post_id_key unique (post_id)
) TABLESPACE pg_default;