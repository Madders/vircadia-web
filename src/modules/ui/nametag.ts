//
//  nametag.ts
//
//  Created by Madders on 13 Jan 2023.
//  Copyright 2023 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

/* eslint-disable @typescript-eslint/no-magic-numbers */

import { Scene, DynamicTexture } from "@babylonjs/core";
import { Store } from "@Base/store";
import { BasicStyle, SAOStyle } from "./nametagGeneratorStyles";

export function generateNametagTexture(name: string, scene: Scene): DynamicTexture {
    let nametagGenertorStyle = undefined;

    switch (Store.state.ui.nametags.style) {
        case "sao":
            nametagGenertorStyle = new SAOStyle();
            break;
        case "basic":
        default:
            nametagGenertorStyle = new BasicStyle();
    }

    nametagGenertorStyle.name = name;
    nametagGenertorStyle.resolution = Store.state.ui.nametags.resolution;
    nametagGenertorStyle.scene = scene;

    return nametagGenertorStyle.generateTexture();
}
