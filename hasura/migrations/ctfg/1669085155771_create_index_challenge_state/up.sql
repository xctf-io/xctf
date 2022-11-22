CREATE  INDEX "challenge_state" on
  "public"."challenge" using hash ("state");
