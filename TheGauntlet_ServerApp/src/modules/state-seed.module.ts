import {Winston} from "winston";
import {Schema} from "../shared";

export class StateSeedModule {
    constructor(private winston: Winston,) {
        if (process.env.DO_SEED) {
            this.doSeed();
        }
    }

    private doSeed() {
        Schema.StateModel.deleteMany({}).then(() => {
            this.winston.info("Purged existing states");
            Schema.StateModel.insertMany([
                {
                    name: "Alabama",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Alabama"
                },
                {
                    name: "Alaska",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Alaska"
                },
                {
                    name: "Arizona",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Arizona"
                },
                {
                    name: "Arkansas",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Arkansas"
                },
                {
                    name: "California",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/California"
                },
                {
                    name: "Colorado",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Colorado"
                },
                {
                    name: "Connecticut",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Connecticut"
                },
                {
                    name: "Delaware",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Delaware"
                },
                {
                    name: "Florida",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Florida"
                },
                {
                    name: "Georgia",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Georgia"
                },
                {
                    name: "Hawaii",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Hawaii"
                },
                {
                    name: "Idaho",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Idaho"
                },
                {
                    name: "Illinois",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Illinois"
                },
                {
                    name: "Indiana",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Indiana"
                },
                {
                    name: "Iowa",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Iowa"
                },
                {
                    name: "Kansas",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Kansas"
                },
                {
                    name: "Kentucky",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Kentucky"
                },
                {
                    name: "Louisiana",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Louisiana"
                },
                {
                    name: "Maine",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Maine"
                },
                {
                    name: "Maryland",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Maryland"
                },
                {
                    name: "Massachusetts",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Massachusetts"
                },
                {
                    name: "Michigan",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Michigan"
                },
                {
                    name: "Minnesota",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Minnesota"
                },
                {
                    name: "Mississippi",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Mississippi"
                },
                {
                    name: "Missouri",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Missouri"
                },
                {
                    name: "Montana",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Montana"
                },
                {
                    name: "Nebraska",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Nebraska"
                },
                {
                    name: "Nevada",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Nevada"
                },
                {
                    name: "New Hampshire",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/New_Hampshire"
                },
                {
                    name: "New Jersey",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/New_Jersey"
                },
                {
                    name: "New Mexico",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/New_Mexico"
                },
                {
                    name: "New York",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/New_York"
                },
                {
                    name: "North Carolina",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/North_Carolina"
                },
                {
                    name: "North Dakota",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/North_Dakota"
                },
                {
                    name: "Ohio",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Ohio"
                },
                {
                    name: "Oklahoma",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Oklahoma"
                },
                {
                    name: "Oregon",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Oregon"
                },
                {
                    name: "Pennsylvania",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Pennsylvania"
                },
                {
                    name: "Rhode Island",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Rhode_Island"
                },
                {
                    name: "South Carolina",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/South_Carolina"
                },
                {
                    name: "South Dakota",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/South_Dakota"
                },
                {
                    name: "Tennessee",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Tennessee"
                },
                {
                    name: "Texas",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Texas"
                },
                {
                    name: "Utah",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Utah"
                },
                {
                    name: "Vermont",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Vermont"
                },
                {
                    name: "Virginia",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Virginia"
                },
                {
                    name: "Washington",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Washington"
                },
                {
                    name: "West Virginia",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/West_Virginia"
                },
                {
                    name: "Wisconsin",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Wisconsin"
                },
                {
                    name: "Wyoming",
                    wikipediaUrl: "https://en.wikipedia.org/wiki/Wyoming"
                }
            ]).then(() => this.winston.info("Successfully seeded DB")).catch(() => this.winston.error("Unable to seed database"));
        }).catch(() => this.winston.error("Unable to purge existing states"));
    }
}