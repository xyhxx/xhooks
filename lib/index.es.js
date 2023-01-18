import { useRef as f, useEffect as t } from "react";
function n(e) {
  const r = f(e);
  return t(function() {
    r.current = e;
  }), r;
}
export {
  n as useLatest
};
