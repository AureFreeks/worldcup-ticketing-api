import { city } from "@mocks/city";
import { country } from "@mocks/country";
import { customer } from "@mocks/customer";

import { match } from "@mocks/match";
import { stadium } from "@mocks/stadium";
import { team } from "@mocks/team";

async function clear() {
    return Promise<void>;
}

async function seed() {
    await clear();
    return Promise<void>;
}

seed();