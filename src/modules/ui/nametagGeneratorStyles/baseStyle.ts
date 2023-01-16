//
//  baseStyle.ts
//
//  Created by Madders on 13 Jan 2023.
//  Copyright 2023 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

/* eslint-disable @typescript-eslint/no-magic-numbers */

import { Scene, DynamicTexture } from "@babylonjs/core";

export abstract class BaseStyle {
    protected _name: string | "";
    protected _resolution: number | undefined;
    protected _scene: Scene | undefined;

    constructor() {
        this._name = "";
    }

    public get name() : string | undefined {
        return this._name;
    }

    public set name(value : string | undefined) {
        if (value && value !== this._name) {
            this._name = value;
        }
    }

    public get resolution() : number | undefined {
        return this._resolution;
    }

    public set resolution(value : number | undefined) {
        if (value && value !== this._resolution) {
            this._resolution = value;
        }
    }

    public get scene() : Scene | undefined {
        return this._scene;
    }

    public set scene(value : Scene | undefined) {
        if (value && value !== this._scene) {
            this._scene = value;
        }
    }

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
            "#121212",
            true,
            true
        );

        return nametagTexture;
    }
}
