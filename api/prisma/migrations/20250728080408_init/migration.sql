-- CreateTable
CREATE TABLE "AirQualityRecord" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "co_gt" DOUBLE PRECISION,
    "pt08_s1_co" INTEGER,
    "nmhc_gt" INTEGER,
    "c6h6_gt" DOUBLE PRECISION,
    "pt08_s2_nmhc" INTEGER,
    "nox_gt" INTEGER,
    "pt08_s3_nox" INTEGER,
    "no2_gt" INTEGER,
    "pt08_s4_no2" INTEGER,
    "pt08_s5_o3" INTEGER,
    "temperature" DOUBLE PRECISION,
    "relative_humidity" DOUBLE PRECISION,
    "absolute_humidity" DOUBLE PRECISION,

    CONSTRAINT "AirQualityRecord_pkey" PRIMARY KEY ("id")
);
