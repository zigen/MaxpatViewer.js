import { PORT_HORIZONTAL_MARGIN, PATCH_LINE_FILL_COLOR, PATCH_LINE_STROKE_COLOR } from "./constants";

class Line {
  constructor(patcher, data) {
    this.patcher = patcher;
    this.srcId = data.patchline.source[0];
    this.srcOutletIndex = data.patchline.source[1];
    this.dstId = data.patchline.destination[0];
    this.dstInletIndex = data.patchline.destination[1];
  }

  render(svg) {
    const { patcher, srcId, dstId, srcOutletIndex, dstInletIndex } = this;
    const outlet = patcher.getObject(srcId).getOutlet(srcOutletIndex);
    const inlet = patcher.getObject(dstId).getInlet(dstInletIndex);
    if (outlet == null || inlet == null) {
      throw new Error(`Invalid port specified: outlet: ${srcId}.${srcOutletIndex}, inlet: ${dstId}.${dstInletIndex}`);
    }
    const sx = outlet.x,
      sy = outlet.y,
      dx = inlet.x,
      dy = inlet.y;

    const mx = (sx + dx) / 2,
      my = (sy + dy) / 2,
      nx = sx + (sx - dx) * 0.01,
      ny = sy + (dy - sy) * 0.7;

    svg
      .path(`M ${sx} ${sy} Q ${nx} ${ny}, ${mx} ${my} T ${dx} ${dy}`)
      .stroke({ width: 3, color: PATCH_LINE_STROKE_COLOR })
      .fill("transparent");
    svg
      .path(`M ${sx} ${sy} Q ${nx} ${ny}, ${mx} ${my} T ${dx} ${dy}`)
      .stroke({ width: 2, color: PATCH_LINE_FILL_COLOR })
      .fill("transparent");
  }
}

export default Line;
