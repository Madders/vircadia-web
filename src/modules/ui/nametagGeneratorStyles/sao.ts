//
//  sao.ts
//
//  Created by Madders on 13 Jan 2023.
//  Copyright 2023 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

/* eslint-disable @typescript-eslint/no-magic-numbers */

import { DynamicTexture } from "@babylonjs/core";
import { BaseStyle } from "./baseStyle";

export class SAOStyle extends BaseStyle {

    public generateTexture(): DynamicTexture {
        const displayText = this.name ? this.name : "";

        const characterWidth = 38.5;
        const tagWidth = (displayText.length + 2) * characterWidth;

        // Texture.
        const nametagTextureResolution = this._resolution;
        const nametagTexture = new DynamicTexture("NametagTexture", {
            width: tagWidth,
            height: nametagTextureResolution
        }, this.scene);

        nametagTexture.drawText(
            displayText,
            tagWidth / 2 - displayText.length / 2 * characterWidth, // Center the name on the tag.
            70,
            "70px monospace",
            "white",
            "transparent",
            true,
            true
        );

        return nametagTexture;
    }
}
