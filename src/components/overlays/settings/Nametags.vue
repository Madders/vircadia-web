<!--
//  Nametags.vue
//
//  Created by Madders on 13 Jan 2023.
//  Copyright 2023 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
-->

<style lang="scss">
/* TODO: Replace these style overrides with inline props once we have upgraded to Quasar >2.4.0. */
.q-slider__track-container--h {
    height: 5px;
    margin-top: -2.5px;
    border-radius: 3px;
}
.q-slider__track--h {
    border-radius: inherit;
}
.q-slider__thumb {
    transform: scale(1.3);
}
.q-slider__focus-ring {
    transition:
        transform 0.22s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.22s cubic-bezier(0, 0, 0.2, 1),
        background-color 0.22s cubic-bezier(0, 0, 0.2, 1);
}
.q-slider--focus .q-slider__focus-ring,
body.desktop .q-slider.q-slider--editable:hover .q-slider__focus-ring {
    transform: scale3d(2, 2, 1);
}
</style>

<template>
    <OverlayShell
        icon="badge"
        title="Nametags"
        :managerProps="propsToPass"
        :defaultHeight="500"
        :defaultWidth="400"
    >
        <q-card
            class="column no-wrap items-stretch full-height"
            style="background: transparent;box-shadow: none;"
        >
            <q-scroll-area class="q-mt-md full-height">
                <q-list class="q-pb-md">
                    <q-item>
                        <q-item-section
                            title="Show Nametags?"
                        >
                            Show Nametags?
                        </q-item-section>
                        <q-item-section class="q-pl-sm">
                            <q-toggle
                                name="show"
                                v-model="show"
                            />
                        </q-item-section>
                        <q-item-section side style="min-width: 5ch;">
                            <output for="show">{{ show ? `On` : `Off` }}</output>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section
                            title="Show for your avatar?"
                        >
                            Show for your avatar?
                        </q-item-section>
                        <q-item-section class="q-pl-sm">
                            <q-toggle
                                name="showForSelf"
                                v-model="showForSelf"
                            />
                        </q-item-section>
                        <q-item-section side style="min-width: 5ch;">
                            <output for="showForSelf">{{ show ? `On` : `Off` }}</output>
                        </q-item-section>
                    </q-item>

                </q-list>
            </q-scroll-area>
        </q-card>
    </OverlayShell>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OverlayShell from "../OverlayShell.vue";
import { Mutations as StoreMutations } from "@Store/index";

export default defineComponent({
    name: "Nametags",
    props: {
        // Primary.
        propsToPass: { type: Object, default: () => ({}) }
    },
    components: {
        OverlayShell
    },
    computed: {
        show: {
            get(): boolean {
                return this.$store.state.ui.nametags.show;
            },
            set(value: boolean) {
                this.$store.commit(StoreMutations.MUTATE, {
                    property: "state.ui.nametags.show",
                    value: Boolean(value)
                });
            }
        },
        showForSelf: {
            get(): boolean {
                return this.$store.state.ui.nametags.showForSelf;
            },
            set(value: boolean) {
                this.$store.commit(StoreMutations.MUTATE, {
                    property: "state.ui.nametags.showForSelf",
                    value: Boolean(value)
                });
            }
        }

    }
});
</script>
