-- CreateTable
CREATE TABLE "AirQualityRecord" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "co_gt" DOUBLE PRECISION NOT NULL,
    "pt08_s1_co" INTEGER NOT NULL,
    "nmhc_gt" INTEGER NOT NULL,
    "c6h6_gt" DOUBLE PRECISION NOT NULL,
    "pt08_s2_nmhc" INTEGER NOT NULL,
    "nox_gt" INTEGER NOT NULL,
    "pt08_s3_nox" INTEGER NOT NULL,
    "no2_gt" INTEGER NOT NULL,
    "pt08_s4_no2" INTEGER NOT NULL,
    "pt08_s5_o3" INTEGER NOT NULL,
    "t" DOUBLE PRECISION NOT NULL,
    "rh" DOUBLE PRECISION NOT NULL,
    "ah" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AirQualityRecord_pkey" PRIMARY KEY ("id")
);
