<!--
//  Explore.vue
//
//  Created by Kalila L. on June 8th, 2021.
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<style lang="scss" scoped>
    .q-field {
        background-color: rgba(0, 0, 0, 0.4);
    }
    .explore-place-item-imagebg {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        text-shadow : -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0 0 10px black;
    }
</style>

<template>
    <OverlayShell
        icon="travel_explore"
        title="Explore"
        :propsToPass="propsToPass"
        :defaultHeight="500"
        :defaultWidth="400"
        :defaultLeft="50"
        :hoverShowBar="true"
        :style="{ 'background': 'rgba(0, 0, 0, 0.3)', 'box-shadow': 'none', border: 'none' }"
    >
        <q-card
            class="column no-wrap items-stretch full-height"
            style="background: transparent; box-shadow: none;"
        >
            <div class="row">
                <q-input
                    borderless
                    dense
                    filled
                    debounce="300"
                    v-model="filterText"
                    placeholder="Search"
                    class="col"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <div class="row">
                <div class="col q-pa-sm" style="text-align: right;">Show:</div>
                <q-chip square clickable color="white" text-color="purple" :outline="filterType!=''" @click="setFilterType('')">
                    All
                </q-chip>
                <q-chip square clickable color="white" text-color="purple" :outline="filterType!='favorite'" @click="setFilterType('favorite')">
                    Favorites
                </q-chip>
                <q-chip square clickable color="white" text-color="purple" :outline="filterType!='active'" @click="setFilterType('active')">
                    Active
                </q-chip>
                <q-chip square clickable color="white" text-color="purple" :outline="filterType!='populated'" @click="setFilterType('populated')">
                    Populated
                </q-chip>
            </div>
            <q-scroll-area
                class="col"
            >
                <q-list style="max-Width: 400px;" :showing="!loading">
                    <q-item
                        v-for="place in filteredAndSortedData"
                        :key="place.placeId"
                        clickable
                        v-ripple
                        @click="openLocation(place.address)"
                        :style="'background-image: url(' + place.thumbnail + ');'"
                        :class="place.thumbnail != null ? 'explore-place-item-imagebg' : ''"
                    >
                        <q-item-section side top>
                            <q-btn round color="white" icon="fas fa-info" clickable @click.stop="openDetails(place)" class="text-purple" size="10px"/>
                        </q-item-section>

                        <q-item-section top>
                            <q-item-label lines="1">
                                {{ place.name }}
                                <q-icon :name="place.favorite ? 'favorite' : 'favorite_border'" size="xs" class="float-right" clickable @click.stop="togglefavorite(place)"/>
                            </q-item-label>
                            <q-item-label caption lines="1">{{ place.description }}</q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                            <q-badge color="white" text-color="black">
                                {{ place.current_attendance }}
                                <q-icon
                                name="people"
                                size="14px"
                                class="q-ml-xs"
                                />
                            </q-badge>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-card>
        <q-inner-loading :showing="loading">
            <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
    </OverlayShell>
</template>

<script>
import OverlayShell from '../OverlayShell.vue';

export default {
    name: 'Explore',

    props: {
        // Primary
        propsToPass: { type: Object, default: () => ({}) }
    },

    components: {
        OverlayShell
    },

    data: () => ({
        placesList: [],
        loading: false,
        filterText: '',
        filterType: ''
    }),

    computed: {
        filteredAndSortedData: function () {
            let returnData = this.placesList;

            returnData = returnData.filter((item) => {
                return (!item.name.toLowerCase().indexOf(this.filterText.toLowerCase()));
            });

            const activeThresholdTime = new Date();
            // activeThresholdTime.setHours(activeThresholdTime.getHours() - 1);
            activeThresholdTime.setMinutes(activeThresholdTime.getMinutes() - 15);

            switch (this.filterType) {
            case 'active':
                returnData = returnData.filter((item) => {
                    return (new Date(item.current_last_update_time) > activeThresholdTime);
                });
                break;
            case 'favorite':
                returnData = returnData.filter((item) => {
                    return (item.favorite);
                });
                break;
            case 'populated':
                returnData = returnData.filter((item) => {
                    return (item.current_attendance > 0);
                });
                break;
            default:
                break;
            }

            returnData = returnData.filter((item) => {
                return (!item.name.toLowerCase().indexOf(this.filterText.toLowerCase()));
            });

            returnData = returnData.sort((a, b) => {
                if (a.current_attendance > b.current_attendance) {
                    return -1;
                }
                if (a.current_attendance < b.current_attendance) {
                    return 1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });

            return returnData;
        }
    },

    methods: {
        async loadPlacesList () {
            this.loading = true;
            const placesResult = await this.$store.state.Explore.retrievePlaces();
            this.placesList = placesResult;
            this.loading = false;
        },

        openLocation (path) {
            alert('Not currently implemented: Open location - ' + path);
        },

        openDetails (place) {
            alert('Not currently implemented: Show details - ' + place.name);
        },

        setFilterType (type) {
            this.filterType = type;
        },

        togglefavorite (place) {
            // TODO: store favourite selections to the local storage
            place.favorite = !place.favorite;
        }
    },

    created: function () {
        this.loadPlacesList();
    },

    mounted: function () {
    }
};
</script>
