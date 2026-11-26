import Cover from "./Cover";
import Inside from "./Inside";

/**
 * The gatefold itself: a centre panel and two flaps that close over it.
 * The outside of the flaps is the cover; the inside of all three panels is one spread.
 * Each panel shows its own slice of the same spread, so the spread reads as one
 * printed surface when it lies open. `drive` (lib/gate.ts) turns the flaps.
 */
export default function GateSheet({ withReal = true }: { withReal?: boolean }) {
  return (
    <div className="g-sheet" data-gate>
      <div className="g-shadow" data-gate-shadow aria-hidden />
      <div className="g-stack" data-gate-stack aria-hidden>
        <i />
        <i />
        <i />
      </div>

      <div className="g-panel g-center" data-gate-center>
        <div className="g-face g-front">
          <div className="g-slice">
            <Inside copy />
          </div>
          <div className="g-shade" data-shade-center />
        </div>
      </div>

      <div className="g-panel g-flap g-a" data-gate-a>
        <div className="g-face g-front">
          <div className="g-slice">
            <Inside copy />
          </div>
          <div className="g-shade" data-shade-front />
        </div>
        <div className="g-face g-back">
          <div className="g-slice">
            <Cover />
          </div>
          <div className="g-shade" data-shade-back />
        </div>
      </div>

      <div className="g-panel g-flap g-b" data-gate-b>
        <div className="g-face g-front">
          <div className="g-slice">
            <Inside copy />
          </div>
          <div className="g-shade" data-shade-front />
        </div>
        <div className="g-face g-back">
          <div className="g-slice">
            <Cover copy />
          </div>
          <div className="g-shade" data-shade-back />
        </div>
      </div>

      {withReal ? (
        <div className="g-real" data-gate-real>
          <Inside />
        </div>
      ) : null}
    </div>
  );
}
