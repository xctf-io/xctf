CREATE UNIQUE INDEX "challenge_id_tag_id" on
    "public"."challenge_tag" using btree ("tag_id", "challenge_id");
