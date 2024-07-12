"use client";

import { Card } from "@twilio-paste/core";
import { FC } from "react";

export type TileProps = {
  url: string;
};

const Tile: FC<TileProps> = (props) => {
  return (
    <Card padding={"space0"}>
      <div className="fill">
        <img src={props.url} width="300px" />
      </div>
    </Card>
  );
};

export default Tile;
