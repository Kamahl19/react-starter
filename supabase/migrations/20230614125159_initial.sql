create table "public"."books" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "author" text not null,
    "description" text not null,
    "createdAt" timestamp with time zone not null default now()
);

alter table "public"."books" enable row level security;

create table "public"."reading_list" (
    "userId" uuid not null,
    "bookId" uuid not null,
    "finished" boolean not null default false,
    "rating" smallint not null default '0',
    "note" text not null default '',
    "createdAt" timestamp with time zone not null default now()
);

alter table "public"."reading_list" enable row level security;

create unique index "reading_list_pkey" on "public"."reading_list" using btree ("userId", "bookId");

create unique index "books_pkey" on "public"."books" using btree ("id");

alter table "public"."books" add constraint "books_pkey" primary key using index "books_pkey";

alter table "public"."reading_list" add constraint "reading_list_pkey" primary key using index "reading_list_pkey";

alter table "public"."reading_list" add constraint "reading_list_bookId_fkey" foreign key ("bookId") references books("id") on delete cascade not valid;

alter table "public"."reading_list" validate constraint "reading_list_bookId_fkey";

alter table "public"."reading_list" add constraint "reading_list_userId_fkey" foreign key ("userId") references auth.users("id") on delete cascade not valid;

alter table "public"."reading_list" validate constraint "reading_list_userId_fkey";

create policy "All users can read"
on "public"."books"
for select
to public
using (true);

create policy "Authenticated users can read their entries"
on "public"."reading_list"
for select
to authenticated
using ( auth.uid() = "userId" );

create policy "Authenticated users can insert their entries"
on "public"."reading_list"
for insert
to authenticated
with check ( auth.uid() = "userId" );

create policy "Authenticated users can update their entries"
on "public"."reading_list"
for update
to authenticated
using ( auth.uid() = "userId" );

create policy "Authenticated users can delete their entries"
on "public"."reading_list"
for delete
to authenticated
using ( auth.uid() = "userId" );
