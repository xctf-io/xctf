CREATE UNIQUE INDEX "key_value_idx" on
  "public"."config" using btree ("key", "value");
