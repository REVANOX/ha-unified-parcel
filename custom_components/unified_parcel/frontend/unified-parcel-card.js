// Unified Parcel Card for Home Assistant
// Combines ha-dhl, ha-amazon, and parcel_tracker into SoerenKaiser99 Parcel Tracker design

const CARRIER_ICONS = {
  dhl: {
    path: "M4.22 10.303l-.767 1.043h4.18c.21 0 .208.078.105.218-.105.142-.28.39-.386.534-.054.073-.154.207.171.207h1.71l.505-.69c.314-.426.028-1.312-1.095-1.312H4.22zM11.424 10.303l-1.475 2.002h5.39l1.473-2.002H14.61l-.843 1.146h-.985l.846-1.146h-2.203zM17.529 10.303l-1.474 2.002h2.334l1.472-2.002H17.53zM4.684 11.603l-1.54 2.094h3.754c1.24 0 1.932-.844 2.145-1.136h-2.56c-.326 0-.226-.133-.172-.207.107-.143.283-.388.388-.53.104-.14.107-.22-.105-.22h-1.91zM9.762 12.562l-.836 1.136h2.203l.836-1.136H9.762zM12.947 12.562l-.836 1.136h2.203l.836-1.136h-2.203zM15.865 12.562s-.159.22-.238.326c-.276.374-.033.81.87.81h3.538l.834-1.136h-5.004z",
    color: "#FFCC00",
    mark: "#D40511"
  },
  amazon: {
    path: "M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z",
    color: "#FF9900"
  },
  dpd: {
    path: "M16.01 10.71a.364.364 0 01-.343-.006l-.558-.331a.43.43 0 01-.182-.312l-.014-.65a.363.363 0 01.165-.3l6.7-3.902L12.377.085A.799.799 0 0012 0a.798.798 0 00-.377.085l-9.4 5.124 10.53 6.13c.098.054.172.181.172.295v8.944c0 .112-.08.241-.178.294l-.567.315c-.171.062-.256.043-.361 0l-.569-.315a.362.362 0 01-.175-.294v-7.973a.223.223 0 00-.095-.156L1.702 7.048v10.579c0 .236.167.528.371.648l9.556 5.636c.102.06.237.09.371.089a.745.745 0 00.371-.09l9.557-5.635a.835.835 0 00.37-.648V7.047Z",
    color: "#DC0032"
  },
  ups: {
    path: "M11.668 14.544l-.028-5.226c.138-.055.387-.111.608-.111.995 0 1.41.774 1.41 2.682 0 1.853-.47 2.765-1.438 2.765-.22 0-.441-.055-.552-.11zM3.124 7.438c4.203-3.843 9.29-4.866 14.018-4.866 1.3 0 2.544.083 3.76.194h-.028v11.253c0 2.184-.774 3.926-2.295 5.171-1.355 1.134-5.447 2.959-6.581 3.456-1.161-.525-5.253-2.378-6.581-3.456-1.493-1.244-2.295-3.014-2.295-5.171V7.438zm12.664 2.599c.028.912.276 1.576 1.687 2.406.747.442 1.051.747 1.051 1.272 0 .581-.387.94-1.023.94-.553 0-1.189-.304-1.631-.691v1.576c.553.304 1.217.525 1.88.525 1.687 0 2.433-1.189 2.461-2.267.028-.995-.249-1.742-1.659-2.571-.608-.387-1.134-.636-1.106-1.244 0-.581.525-.802.995-.802.581 0 1.161.332 1.521.691V8.378c-.304-.221-.94-.581-1.88-.553-1.135.028-2.296.829-2.296 2.212zm-5.834 9.484h1.714l-.028-3.594c.166.028.415.083.774.083 1.908 0 2.986-1.687 2.986-4.175 0-2.461-1.106-4.009-3.152-4.009-.94 0-1.687.221-2.295.608v11.087zm-5.945-6.166c0 1.797.829 2.71 2.516 2.71 1.051 0 1.908-.249 2.571-.691V7.991H7.41v6.387c-.194.138-.47.221-.802.221-.774 0-.885-.719-.885-1.189V7.991H4.009v5.364zM22.12 2.295v11.723c0 2.516-.94 4.645-2.765 6.111-1.549 1.3-6.332 3.429-7.355 3.871-1.023-.442-5.806-2.571-7.355-3.843-1.797-1.465-2.765-3.594-2.765-6.111V2.295C4.756.747 8.074 0 12 0s7.244.747 10.12 2.295zm-.304.221c-2.71-1.465-6-2.184-9.788-2.184s-7.079.746-9.788 2.184v11.502c0 2.433.912 4.452 2.627 5.862 1.576 1.3 6.581 3.484 7.161 3.76.581-.249 5.585-2.433 7.161-3.733 1.714-1.41 2.627-3.429 2.627-5.862V2.516zm-2.433 20.295c0 .47-.387.829-.829.829a.831.831 0 0 1-.829-.829c0-.47.387-.829.829-.829.441 0 .801.359.829.829zm-.166 0a.679.679 0 0 0-.664-.691c-.359 0-.664.332-.664.691 0 .359.304.664.664.664a.673.673 0 0 0 .664-.664zm-.553.055c.028.055.304.442.304.442h-.221s-.276-.387-.276-.415h-.028v.415h-.194v-.995l.304-.028c.249 0 .332.166.332.304s-.083.25-.221.277zm.027-.276c0-.055 0-.138-.166-.138h-.083v.304h.028c.194 0 .221-.083.221-.166z",
    color: "#FFB500"
  }
};

const DOTS = {
  gls: { color: "#061AB1", letter: "G", size: 13, y: 16.5 },
  hermes: { color: "#0091CD", letter: "H", size: 13, y: 16.5 },
  aliexpress: { color: "#E43225", letter: "A", size: 13, y: 16.5 },
  other: { color: "#757575", letter: "P", size: 12, y: 16.5 }
};

const STEPS = 5;
const MONTH_SHORT = ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];

const esc = (s) => (s == null ? "" : String(s).replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c])));

const stripHtml = (html) => {
  if (!html) return "";
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const formatSubHtml = (text) => {
  if (!text) return "";
  const aRegex = /<a\s+[^>]*?href=['"]([^'"]*)['"][^>]*>([\s\S]*?)<\/a>/gi;
  if (!/<a\s+/i.test(text)) {
    return esc(stripHtml(text));
  }
  let result = "";
  let lastIndex = 0;
  let match;
  while ((match = aRegex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index);
    const cleanBefore = stripHtml(before);
    if (cleanBefore) {
      result += esc(cleanBefore) + " ";
    }
    const href = match[1];
    const label = stripHtml(match[2]);
    result += `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer" class="station-link" onclick="event.stopPropagation()">${esc(label)}</a>`;
    lastIndex = match.index + match[0].length;
  }
  const after = text.slice(lastIndex);
  const cleanAfter = stripHtml(after);
  if (cleanAfter) {
    result += " " + esc(cleanAfter);
  }
  return result;
};

const cleanText = (t) => {
  if (!t) return "";
  let s = String(t).trim();
  if (s.length > 55) {
    const comma = s.indexOf(",");
    if (comma > 15 && comma < 50) return s.slice(0, comma).trim();
    return s.slice(0, 52) + "...";
  }
  return s;
};

const fmtDate = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  return isNaN(dt) ? "" : dt.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
};

const fmtTime = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  return isNaN(dt) ? "" : dt.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
};

const MONTHS_MAP = {
  jan: 0, januar: 0, january: 0,
  feb: 1, februar: 1, february: 1,
  mar: 2, mrz: 2, märz: 2, maerz: 2, march: 2,
  apr: 3, april: 3,
  mai: 4, may: 4,
  jun: 5, juni: 5, june: 5,
  jul: 6, juli: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  okt: 9, oct: 9, oktober: 9, october: 9,
  nov: 10, november: 10,
  dez: 11, dec: 11, dezember: 11, december: 11
};

const WDAYS_MAP = {
  sonntag: 0, sunday: 0, so: 0,
  montag: 1, monday: 1, mo: 1,
  dienstag: 2, tuesday: 2, di: 2,
  mittwoch: 3, wednesday: 3, mi: 3,
  donnerstag: 4, thursday: 4, do: 4,
  freitag: 5, friday: 5, fr: 5,
  samstag: 6, saturday: 6, sa: 6, sonnabend: 6
};

const parseArrivalTimestamp = (str, refDate) => {
  if (!str) return null;
  if (typeof str === "number" && !isNaN(str)) return str;
  if (str instanceof Date && !isNaN(str.getTime())) return str.getTime();

  if (typeof str === "string" && /^\d{4}-\d{2}-\d{2}/.test(str)) {
    const d = new Date(str.length === 10 ? str + "T12:00:00" : str);
    if (!isNaN(d.getTime())) return d.getTime();
  }

  const s = String(str).toLowerCase().trim();
  const now = refDate ? new Date(refDate) : new Date();

  // German date format DD.MM.YYYY or DD.MM. (e.g. "29.10.2026", "29.10.")
  const dmyMatch = s.match(/(\d{1,2})\.(\d{1,2})\.(?:(\d{4}|\d{2}))?/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    let year = dmyMatch[3] ? parseInt(dmyMatch[3], 10) : now.getFullYear();
    if (year < 100) year += 2000;
    const d = new Date(year, month, day, 12, 0, 0, 0);
    if (!isNaN(d.getTime())) return d.getTime();
  }

  if (s.includes("heute") || s.includes("today")) {
    const d = new Date(now);
    d.setHours(12, 0, 0, 0);
    return d.getTime();
  }
  if (s.includes("morgen") || s.includes("tomorrow")) {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    d.setHours(12, 0, 0, 0);
    return d.getTime();
  }
  if (s.includes("übermorgen") || s.includes("uebermorgen")) {
    const d = new Date(now);
    d.setDate(d.getDate() + 2);
    d.setHours(12, 0, 0, 0);
    return d.getTime();
  }

  // Weekdays
  for (const [name, targetDay] of Object.entries(WDAYS_MAP)) {
    const regex = new RegExp("\\b" + name + "\\b|am " + name, "i");
    if (regex.test(s) || s === name) {
      const d = new Date(now);
      let diff = targetDay - d.getDay();
      if (diff <= 0) diff += 7;
      d.setDate(d.getDate() + diff);
      d.setHours(12, 0, 0, 0);
      return d.getTime();
    }
  }

  // Date like "8 November", "8. Nov", "8.–13. Nov.", "26 November - 3 December"
  const dateMatch = s.match(/(\d{1,2})\.?\s*(?:–|-|\s)\s*(?:\d{1,2}\.?)?\s*([a-zäöü]+)/i) ||
                    s.match(/(\d{1,2})\.?\s+([a-zäöü]+)/i);
  if (dateMatch) {
    const day = parseInt(dateMatch[1], 10);
    const mStr = dateMatch[2].toLowerCase();
    for (const [mName, mIdx] of Object.entries(MONTHS_MAP)) {
      if (mStr.startsWith(mName)) {
        let year = now.getFullYear();
        if (mIdx < now.getMonth() - 1) year++;
        const d = new Date(year, mIdx, day, 12, 0, 0, 0);
        return d.getTime();
      }
    }
  }

  return null;
};

class UnifiedParcelCard extends HTMLElement {
  static getStubConfig(hass) {
    return {
      type: "custom:unified-parcel-card",
      title: "📦 Meine Pakete",
      entity: "sensor.pakete_aktiv",
      show_delivered: false,
      show_carrier_chips: true
    };
  }
  setConfig(config) {
    this._config = Object.assign({
      carrier: null,
      title: null,
      show_delivered: false,
      show_carrier_chips: true,
      max_height: null,
    }, config || {});
    // Auto-detect carrier from entity name if sensor.pakete_<carrier> is used
    if (!this._config.carrier && this._config.entity) {
      const m = String(this._config.entity).match(/sensor\.pakete_([a-z0-9]+)/i);
      if (m && ['dhl', 'amazon', 'dpd', 'hermes', 'ups', 'fedex'].includes(m[1].toLowerCase())) {
        this._config.carrier = m[1].toLowerCase();
      }
    }
    this._selectedCarrier = this._config.carrier ? this._config.carrier.toLowerCase() : "all";
    this._open = new Set();
  }

  connectedCallback() {
    if (!this._timer) {
      this._timer = setInterval(() => {
        if (this._root) this._render();
      }, 60000); // Check every minute so 2h expiration happens live
    }
  }

  disconnectedCallback() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._root) {
      this._build();
    }
    this._render();
  }

  _build() {
    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = `
      <style>
        :host {
          display: block;
        }
        ha-card {
          padding: 16px;
          box-sizing: border-box;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        
        .refresh-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--primary-text-color, #fff);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0;
          outline: none;
        }
        .refresh-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: scale(1.08);
          color: var(--primary-color, #3b82f6);
        }
        .refresh-btn:active {
          transform: scale(0.92);
        }
        .refresh-btn ha-icon {
          --mdc-icon-size: 18px;
        }
        .refresh-btn.spinning ha-icon {
          animation: upc-spin 0.8s linear infinite;
        }
        @keyframes upc-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
.head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .lead {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .title {
          font-size: 16px;
          font-weight: 600;
          display: flex;
          gap: 8px;
          align-items: center;
          color: var(--primary-text-color, #ffffff);
          letter-spacing: -0.2px;
        }
        .title ha-icon {
          --mdc-icon-size: 20px;
          color: var(--primary-color, #0071e3);
        }
        .carrier-chips {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding: 2px 0 10px 0;
          margin-bottom: 4px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .carrier-chips::-webkit-scrollbar {
          display: none;
        }
        .chip {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: 3px 10px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--secondary-text-color, rgba(255, 255, 255, 0.75));
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          transition: all 0.18s ease;
          outline: none;
        }
        .chip:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #fff;
          transform: translateY(-1px);
        }
        .chip.active {
          background: var(--primary-color, #0071e3);
          border-color: var(--primary-color, #0071e3);
          color: #fff;
          font-weight: 600;
        }
        .chip-dot {
          width: 7.5px;
          height: 7.5px;
          border-radius: 50%;
          display: inline-block;
          flex: none;
        }
        .badges {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .badge {
          font-size: 11.5px;
          font-weight: 500;
          line-height: 1.35;
          padding: 2px 8px;
          border-radius: 12px;
          white-space: nowrap;
        }
        .badge.sure {
          background: var(--primary-color, #0071e3);
          color: #ffffff;
        }
        .badge.possible {
          background: rgba(255, 255, 255, 0.12);
          color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .badge.pickup {
          background: #ff9500;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-weight: 700;
          animation: pulse-glow-orange 2s infinite ease-in-out;
        }
        .badge.pickup .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffffff;
          animation: radar-ping 1.5s infinite;
        }
        .badge.done {
          background: rgba(52, 199, 89, 0.2);
          color: #34c759;
          border: 1px solid rgba(52, 199, 89, 0.45);
          font-weight: 600;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(52, 199, 89, 0.35), inset 0 0 8px rgba(52, 199, 89, 0.15);
            border-color: rgba(52, 199, 89, 0.55);
          }
          50% {
            box-shadow: 0 0 22px rgba(52, 199, 89, 0.7), inset 0 0 14px rgba(52, 199, 89, 0.35);
            border-color: rgba(52, 199, 89, 1);
          }
        }
        @keyframes radar-ping {
          0% { transform: scale(0.85); opacity: 0.95; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .pickup-alert-banner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          margin-bottom: 14px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(255, 149, 0, 0.22) 0%, rgba(210, 110, 0, 0.1) 100%);
          border: 1.5px solid rgba(255, 149, 0, 0.7);
          animation: pulse-glow-orange 2.2s infinite ease-in-out;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .pickup-icon-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 149, 0, 0.28);
          color: #ff9500;
          flex: none;
        }
        .pickup-icon-box ha-icon {
          --mdc-icon-size: 19px;
          animation: icon-bounce 2s infinite ease-in-out;
        }
        .spin-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px dashed rgba(255, 149, 0, 0.95);
          animation: spin 5s linear infinite;
        }
        .radar-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #ff9500;
          animation: radar-ping 2s infinite cubic-bezier(0, 0, 0.2, 1);
          pointer-events: none;
        }
        .pickup-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1 1 auto;
        }
        .pickup-headline {
          font-size: 13.5px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.2px;
        }
        .pickup-subtext {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.8);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item {
          border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
          padding: 12px 0;
          transition: background 0.15s ease;
        }
        .item.is-pickup {
          border-left: 3.5px solid #ff9500;
          padding-left: 10px;
          margin-left: -10px;
          background: rgba(255, 149, 0, 0.08);
          border-radius: 6px;
        }
        .item.is-delivered {
          opacity: 0.9;
        }
        .item.is-delivered .bar i.on {
          background: #34c759;
          box-shadow: 0 0 6px rgba(52, 199, 89, 0.4);
        }
        .item:first-child {
          border-top: none;
          padding-top: 4px;
        }
        .row-toggle {
          display: block;
          width: 100%;
          border: none;
          background: none;
          padding: 0;
          margin: 0;
          text-align: left;
          font: inherit;
          color: inherit;
          cursor: pointer;
        }
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }
        .name {
          font-weight: 600;
          font-size: 14px;
          display: flex;
          gap: 8px;
          align-items: center;
          min-width: 0;
          flex: 1 1 auto;
          color: var(--primary-text-color, #ffffff);
        }
        .name span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .right-box {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: none;
        }
        .eta {
          font-size: 13px;
          white-space: nowrap;
          color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
          font-weight: 500;
        }
        .eta.today {
          color: var(--success-color, #34c759);
          font-weight: 600;
        }
        .eta.pickup-ready {
          background: rgba(255, 149, 0, 0.22);
          color: #ff9f0a;
          border: 1px solid rgba(255, 149, 0, 0.65);
          padding: 2px 7px;
          border-radius: 8px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          animation: pulse-glow-orange 2.5s infinite ease-in-out;
        }
        .eta.delivered {
          background: rgba(52, 199, 89, 0.18);
          color: #34c759;
          border: 1px solid rgba(52, 199, 89, 0.45);
          padding: 2px 7px;
          border-radius: 8px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .eta.pickup-ready ha-icon, .eta.delivered ha-icon {
          --mdc-icon-size: 14px;
        }
        .chev {
          flex: none;
          box-sizing: border-box;
          width: 6.5px;
          height: 6.5px;
          margin-left: 2px;
          border-right: 1.5px solid var(--secondary-text-color, rgba(255, 255, 255, 0.5));
          border-bottom: 1.5px solid var(--secondary-text-color, rgba(255, 255, 255, 0.5));
          transform: rotate(-45deg);
          transition: transform 0.18s ease;
        }
        .row-toggle[aria-expanded="true"] .chev {
          transform: translateY(-2px) rotate(45deg);
        }
        .sub {
          font-size: 12.5px;
          color: var(--secondary-text-color, rgba(255, 255, 255, 0.65));
          margin: 4px 0 8px;
          line-height: 1.35;
        }
        .sub .station-link {
          color: #2997ff;
          text-decoration: underline;
          text-underline-offset: 2px;
          cursor: pointer;
        }
        .sub .station-link:hover {
          color: #64b5f6;
        }
        .bar {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
        }
        .bar i {
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.15);
        }
        .bar i.on {
          background: var(--primary-color, #0071e3);
          box-shadow: 0 0 6px rgba(0, 113, 227, 0.6);
        }
        .detail {
          margin-top: 10px;
          font-size: 12px;
          color: var(--secondary-text-color, rgba(255, 255, 255, 0.75));
          line-height: 1.6;
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
          padding-top: 8px;
        }
        .ev {
          padding-inline-start: 1em;
          text-indent: -1em;
          margin-bottom: 3px;
        }
        .ids {
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.05);
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .ids a.go {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--primary-color, #0071e3);
          text-decoration: none;
          font-weight: 500;
        }
        .ids a.go ha-icon {
          --mdc-icon-size: 16px;
        }
        svg {
          width: 18px;
          height: 18px;
          flex: none;
        }
        svg.dhl {
          width: 32px;
          height: 19px;
        }
        svg.amz {
          width: 20px;
          height: 20px;
        }
        .empty {
          color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
          font-size: 13px;
          text-align: center;
          padding: 16px 0;
        }
        #list {
          max-height: var(--upc-max-height, 750px);
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 4px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
        }
        #list::-webkit-scrollbar {
          width: 5px;
        }
        #list::-webkit-scrollbar-track {
          background: transparent;
        }
        #list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 4px;
        }
        #list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.45);
        }
      </style>
      <ha-card>
        <div class="head">
          <div class="lead">
            <div class="title" id="card-title">
              <span id="title-icon"><ha-icon icon="mdi:package-variant"></ha-icon></span>
              <span id="title-text">Pakete</span>
            </div>
            <div class="badges" id="badges"></div>
          </div>
          <button class="refresh-btn" id="refresh-btn" title="Sendungen jetzt aktualisieren" aria-label="Aktualisieren">
            <ha-icon icon="mdi:refresh"></ha-icon>
          </button>
        </div>
        <div id="carrier-chips" class="carrier-chips"></div>
        <div id="banner"></div>
        <div id="list"></div>
      </ha-card>
    `;
  }

  _icon(carrier) {
    const c = (carrier || "other").toLowerCase();
    if (c === "dhl") {
      const ic = CARRIER_ICONS.dhl;
      return `<svg class="dhl" viewBox="1.6 5.76 20.8 12.48" aria-label="DHL"><rect x="1.6" y="5.76" width="20.8" height="12.48" rx="2.1" fill="${ic.color}"/><path fill="${ic.mark}" d="${ic.path}"/></svg>`;
    }
    if (c === "fedex") {
      return `<svg class="fedex" viewBox="0 0 28 20" aria-label="FedEx"><rect width="28" height="20" rx="4" fill="#4D148C"/><text x="3" y="14.5" font-family="Arial, sans-serif" font-weight="900" font-size="11" fill="#FFFFFF">Fed</text><text x="17.2" y="14.5" font-family="Arial, sans-serif" font-weight="900" font-size="11" fill="#FF6600">Ex</text></svg>`;
    }
    if (c === "hermes") {
      const ic = CARRIER_ICONS.hermes;
      return `<svg class="hermes" viewBox="0 0 24 24" aria-label="Hermes"><rect width="24" height="24" rx="5" fill="${ic.color}"/><path fill="#fff" transform="scale(0.85) translate(2, 2)" d="${ic.path}"/></svg>`;
    }
    if (c === "amazon") {
      const ic = CARRIER_ICONS.amazon;
      return `<svg class="amz" viewBox="0 0 24 24" aria-label="Amazon"><path fill="${ic.color}" d="${ic.path}"/></svg>`;
    }
    if (CARRIER_ICONS[c]) {
      return `<svg viewBox="0 0 24 24" aria-label="${esc(carrier)}"><path fill="${CARRIER_ICONS[c].color}" d="${CARRIER_ICONS[c].path}"/></svg>`;
    }
    const dot = DOTS[c] || DOTS.other;
    return `<svg viewBox="0 0 24 24" aria-label="${esc(carrier)}"><circle cx="12" cy="12" r="11" fill="${dot.color}"/><text x="12" y="${dot.y}" text-anchor="middle" font-size="${dot.size}" font-weight="700" font-family="sans-serif" fill="#fff">${dot.letter}</text></svg>`;
  }

  _collectParcels() {
    const h = this._hass;
    if (!h || !h.states) return [];

    // Priorisiere nativen Unified Parcel Sensor falls vorhanden
    if (h.states['sensor.pakete_aktiv'] && h.states['sensor.pakete_aktiv'].attributes && Array.isArray(h.states['sensor.pakete_aktiv'].attributes.parcels)) {
      return h.states['sensor.pakete_aktiv'].attributes.parcels;
    }

    const now = Date.now();
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000; // 2 hours in ms

    // Gather parcels from DHL, Amazon, Hermes, and E-Mail (DPD, Otto, etc.)
    const rawDhlList = [];
    const rawAmzList = [];
    const rawHermesList = [];
    const rawEmailList = [];

    for (const [eid, stateObj] of Object.entries(h.states)) {
      if (!stateObj || !stateObj.attributes || !Array.isArray(stateObj.attributes.parcels)) continue;
      if (eid.includes("dhl_") && (eid.includes("eingehende_pakete") || eid.includes("zugestellte_pakete") || eid.includes("incoming") || eid.includes("delivered"))) {
        for (const p of stateObj.attributes.parcels) {
          if (p) rawDhlList.push(p);
        }
      } else if (eid.includes("amazon_") && (eid.includes("eingehende_pakete") || eid.includes("zugestellte_pakete") || eid.includes("incoming") || eid.includes("delivered"))) {
        for (const p of stateObj.attributes.parcels) {
          if (p) rawAmzList.push(p);
        }
      } else if (eid.includes("hermes_") && (eid.includes("eingehende_pakete") || eid.includes("zugestellte_pakete") || eid.includes("incoming") || eid.includes("delivered"))) {
        for (const p of stateObj.attributes.parcels) {
          if (p) rawHermesList.push(p);
        }
      } else if (eid.includes("email_pakete") || eid.includes("e_mail_pakete") || eid.includes("weitere_pakete")) {
        for (const p of stateObj.attributes.parcels) {
          if (p) rawEmailList.push(p);
        }
      }
    }

    // Dynamic fallback across all entities without hardcoded IDs
    for (const [eid, sObj] of Object.entries(h.states)) {
      if (!sObj || !sObj.attributes || !Array.isArray(sObj.attributes.parcels)) continue;
      if (!rawDhlList.length && eid.startsWith('sensor.dhl_') && (eid.includes('eingehende') || eid.includes('zugestellte'))) {
        rawDhlList.push(...sObj.attributes.parcels);
      } else if (!rawAmzList.length && eid.startsWith('sensor.amazon_') && (eid.includes('eingehende') || eid.includes('zugestellte'))) {
        rawAmzList.push(...sObj.attributes.parcels);
      }
    }

    // Deduplicate DHL parcels by barcode (preferring delivered if one exists)
    const dhlDedup = new Map();
    for (const p of rawDhlList) {
      const code = String(p.barcode || (p.raw && p.raw.id) || "").trim().toUpperCase();
      if (!code) continue;
      if (!dhlDedup.has(code) || (!dhlDedup.get(code).delivered && p.delivered)) {
        dhlDedup.set(code, p);
      }
    }

    // Deduplicate Amazon parcels
    const amzDedup = new Map();
    for (const p of rawAmzList) {
      const code = String(p.barcode || (p.raw && (p.raw.tracking_id || p.raw.order_id)) || "").trim().toUpperCase();
      if (!code) continue;
      if (!amzDedup.has(code) || (!amzDedup.get(code).delivered && p.delivered)) {
        amzDedup.set(code, p);
      }
    }

    // Process DHL parcels
    const dhlMap = new Map();
    const dhlList = [];

    for (const p of dhlDedup.values()) {
      if (!p) continue;
      const code = String(p.barcode || "").trim();
      const raw = p.raw || {};
      const verl = (raw.sendungsdetails && raw.sendungsdetails.sendungsverlauf) || raw.sendungsverlauf || {};
      const zust = raw.zustellung || {};
      const statusText = p.raw_status || verl.status || "In Bearbeitung";
      const stLower = statusText.toLowerCase();

      // Check if delivered / picked up
      const isDelivered = (
        p.delivered === true ||
        p.status === "delivered" ||
        raw.istZugestellt === true ||
        (zust && zust.zugestelltAnEmpfaenger === true) ||
        stLower.includes("abholung in der filiale ist erfolgt") ||
        stLower.includes("abholung ist erfolgt") ||
        stLower.includes("aus der packstation abgeholt") ||
        stLower.includes("vom empfänger abgeholt") ||
        (stLower.includes("hat die sendung") && stLower.includes("abgeholt")) ||
        stLower.includes("erfolgreich zugestellt") ||
        stLower.includes("wurde zugestellt")
      );

      // Check if ready for pickup (Packstation / Filiale)
      const isPickupReady = (
        !isDelivered &&
        (
          p.pickup === true ||
          p.status === "ready_for_pickup" ||
          zust.abholcodeAvailable === true ||
          stLower.includes("abholung bereit") ||
          stLower.includes("abholbereit") ||
          (stLower.includes("packstation") && stLower.includes("bereit")) ||
          stLower.includes("filiale benachrichtigt")
        )
      );

      let deliveredTime = null;
      if (isDelivered) {
        if (p.delivered_at) {
          const d = new Date(p.delivered_at);
          if (!isNaN(d.getTime())) deliveredTime = d.getTime();
        }
        if (!deliveredTime && verl.events && Array.isArray(verl.events)) {
          for (let i = verl.events.length - 1; i >= 0; i--) {
            const ev = verl.events[i];
            const evSt = (ev.status || "").toLowerCase();
            if (evSt.includes("abgeholt") || evSt.includes("zugestellt") || evSt.includes("erfolgt")) {
              const d = new Date(ev.datum);
              if (!isNaN(d.getTime())) {
                deliveredTime = d.getTime();
                break;
              }
            }
          }
        }
        if (!deliveredTime && verl.datumAktuellerStatus) {
          const d = new Date(verl.datumAktuellerStatus);
          if (!isNaN(d.getTime())) deliveredTime = d.getTime();
        }

        // Local storage persistence for delivery/pickup time
        const storageKey = "upc_del_time_" + code;
        if (!deliveredTime) {
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            deliveredTime = parseInt(saved, 10);
          } else {
            deliveredTime = now;
            try { localStorage.setItem(storageKey, String(deliveredTime)); } catch (e) {}
          }
        } else {
          try { localStorage.setItem(storageKey, String(deliveredTime)); } catch (e) {}
        }

        // Disappear after 2 hours
        if (now - deliveredTime > TWO_HOURS_MS) {
          continue;
        }
      }

      // Progress: 1-5
      let progress = verl.fortschritt || 1;
      if (isDelivered || isPickupReady) {
        progress = 5;
      } else if (p.status === "out_for_delivery" || stLower.includes("packstation") || stLower.includes("zustellfahrzeug")) {
        progress = Math.max(progress, 4);
      } else if (p.status === "in_transit") {
        progress = Math.max(progress, 2);
      }

      // ETA string
      let isToday = false;
      let etaStr = progress >= 2 ? "Unterwegs" : "Bestellt";
      if (p.status === "out_for_delivery" || stLower.includes("zustellfahrzeug")) {
        etaStr = "In Zustellung";
        isToday = true;
      }
      let deliveryDate = null;

      if (isDelivered) {
        const isPickedUp = (
          stLower.includes("abgeholt") ||
          stLower.includes("abholung") ||
          stLower.includes("packstation") ||
          stLower.includes("filiale") ||
          (zust && (zust.abholcodeAvailable || zust.benachrichtigtInFiliale))
        );
        etaStr = isPickedUp ? "Abgeholt" : "Zugestellt";
      } else if (isPickupReady) {
        isToday = true;
        etaStr = "Abholbereit";
      } else {
        const zustVon = (zust && zust.zustellzeitfensterVon) || null;
        if (zustVon) {
          deliveryDate = new Date(zustVon + "T12:00:00");
        } else if (p.planned_from) {
          deliveryDate = new Date(p.planned_from);
        }
        const heuteMatch = stLower.includes("heute") || (p.status === "out_for_delivery");

        if (deliveryDate && !isNaN(deliveryDate.getTime())) {
          const todayMid = new Date();
          todayMid.setHours(0,0,0,0);
          const targetMid = new Date(deliveryDate);
          targetMid.setHours(0,0,0,0);
          const diffDays = Math.round((targetMid.getTime() - todayMid.getTime()) / 864e5);

          if (diffDays === 0 || (diffDays <= 0 && heuteMatch)) {
            isToday = true;
            etaStr = "Heute";
          } else if (diffDays === 1) {
            etaStr = "Morgen";
          } else if (diffDays === 2) {
            etaStr = "Übermorgen";
          } else if (diffDays > 2 && diffDays < 7) {
            const wdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
            etaStr = wdays[deliveryDate.getDay()];
          } else if (diffDays >= 7) {
            etaStr = fmtDate(deliveryDate);
          }
        } else if (heuteMatch) {
          isToday = true;
          etaStr = "Heute";
        }
      }

      // Location / Subtitle
      let sub = "DHL · " + statusText;
      if (isDelivered && deliveredTime) {
        const timeStr = fmtTime(deliveredTime);
        if (timeStr && !statusText.includes(timeStr)) {
          sub = "DHL · " + (etaStr === "Abgeholt" ? "Abgeholt um " : "Zugestellt um ") + timeStr + " Uhr";
        }
      }

      // Events
      const events = (verl.events || []).map((e) => ({
        timestamp: e.datum,
        text: stripHtml(e.status),
        location: e.ort
      }));

      let etaTimestamp = null;
      if (isPickupReady) {
        etaTimestamp = 0;
      } else if (isDelivered) {
        etaTimestamp = deliveredTime || now;
      } else if (deliveryDate && !isNaN(deliveryDate.getTime())) {
        etaTimestamp = deliveryDate.getTime();
      } else if (isToday) {
        const d = new Date(now); d.setHours(12, 0, 0, 0); etaTimestamp = d.getTime();
      } else {
        etaTimestamp = parseArrivalTimestamp(etaStr, now) || parseArrivalTimestamp(statusText, now);
      }

      const itemObj = {
        id: code || Math.random().toString(),
        carrier: "dhl",
        carrierLabel: "DHL",
        name: cleanText(p.sender || "DHL Sendung"),
        barcode: code,
        statusText: statusText,
        sub: sub,
        eta: etaStr,
        etaTimestamp: etaTimestamp,
        isToday: isToday,
        isPickup: isPickupReady,
        isDelivered: isDelivered,
        deliveredTime: deliveredTime,
        progress: progress,
        url: p.url || `https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode=${code}`,
        events: events
      };

      if (code) dhlMap.set(code.toUpperCase(), itemObj);
      dhlList.push(itemObj);
    }

    // Process Amazon parcels
    const amzList = [];
    for (const p of amzDedup.values()) {
      if (!p) continue;
      const raw = p.raw || {};
      const trackingId = String(raw.tracking_id || p.barcode || "").trim();
      const codeUpper = trackingId.toUpperCase();

      const itemName = (raw.items && raw.items.length) ? raw.items[0] : (p.sender || "Amazon Bestellung");
      const cleanName = cleanText(itemName);

      // Match found with DHL! Enrich DHL parcel with product name
      if (trackingId && dhlMap.has(codeUpper)) {
        const existing = dhlMap.get(codeUpper);
        existing.name = cleanName;
        existing.sub = `Amazon · via DHL · ${existing.statusText}`;
        existing.amazonOrderId = raw.order_id;
        existing.amazonUrl = p.url;
        if (existing.etaTimestamp == null) {
          existing.etaTimestamp = parseArrivalTimestamp(rawStatus, now);
        }
        continue;
      }

      const rawStatus = raw.order_status || p.raw_status || "";
      const rsLower = rawStatus.toLowerCase();
      const milestone = raw.milestone || (raw.page_state && raw.page_state.progressTracker && raw.page_state.progressTracker.lastReachedMilestone);

      const isDelivered = (
        p.delivered === true ||
        p.status === "delivered" ||
        milestone === "DELIVERED" ||
        rsLower.includes("zugestellt") ||
        rsLower.includes("delivered") ||
        rsLower.includes("abgeholt")
      );

      const isPickupReady = (
        !isDelivered &&
        (
          rsLower.includes("abhol") ||
          rsLower.includes("pickup") ||
          rsLower.includes("locker") ||
          milestone === "READY_FOR_PICKUP"
        )
      );

      let deliveredTime = null;
      if (isDelivered) {
        if (p.delivered_at) {
          const d = new Date(p.delivered_at);
          if (!isNaN(d.getTime())) deliveredTime = d.getTime();
        }
        if (!deliveredTime && raw.events && Array.isArray(raw.events)) {
          for (let i = raw.events.length - 1; i >= 0; i--) {
            const ev = raw.events[i];
            const evDesc = (ev.description || ev.status || "").toLowerCase();
            if (evDesc.includes("zugestellt") || evDesc.includes("delivered") || evDesc.includes("abgeholt")) {
              const d = new Date(ev.timestamp);
              if (!isNaN(d.getTime())) {
                deliveredTime = d.getTime();
                break;
              }
            }
          }
        }
        const storageKey = "upc_del_time_" + (trackingId || raw.order_id || p.barcode);
        if (!deliveredTime) {
          const saved = localStorage.getItem(storageKey);
          if (saved) deliveredTime = parseInt(saved, 10);
          else {
            deliveredTime = now;
            try { localStorage.setItem(storageKey, String(deliveredTime)); } catch (e) {}
          }
        } else {
          try { localStorage.setItem(storageKey, String(deliveredTime)); } catch (e) {}
        }

        if (now - deliveredTime > TWO_HOURS_MS) {
          continue; // Disappear after 2 hours
        }
      }

      let progress = 1;
      let etaStr = "Bestellt";
      let isToday = false;

      if (isDelivered) {
        progress = 5;
        const isPickedUp = rsLower.includes("abgeholt") || rsLower.includes("pickup") || rsLower.includes("locker");
        etaStr = isPickedUp ? "Abgeholt" : "Zugestellt";
      } else if (isPickupReady) {
        progress = 5;
        isToday = true;
        etaStr = "Abholbereit";
      } else {
        if (rsLower.includes("today") || rsLower.includes("heute")) {
          isToday = true;
          etaStr = "Heute";
          progress = 4;
        } else if (rsLower.includes("tomorrow") || rsLower.includes("morgen")) {
          etaStr = "Morgen";
          progress = 2;
        } else if (rsLower.includes("monday") || rsLower.includes("montag")) {
          etaStr = "Montag";
          progress = 2;
        } else if (rsLower.includes("tuesday") || rsLower.includes("dienstag")) {
          etaStr = "Dienstag";
          progress = 2;
        } else if (rsLower.includes("wednesday") || rsLower.includes("mittwoch")) {
          etaStr = "Mittwoch";
          progress = 2;
        } else if (rsLower.includes("thursday") || rsLower.includes("donnerstag")) {
          etaStr = "Donnerstag";
          progress = 2;
        } else if (rsLower.includes("friday") || rsLower.includes("freitag")) {
          etaStr = "Freitag";
          progress = 2;
        } else if (rsLower.includes("saturday") || rsLower.includes("samstag")) {
          etaStr = "Samstag";
          progress = 2;
        } else if (rsLower.includes("arriving")) {
          const match = rawStatus.match(/(\d+)\s+([A-Za-z]+)\s*-\s*(\d+)\s+([A-Za-z]+)/i);
          if (match) {
            const mName = match[2].slice(0, 3) + ".";
            etaStr = `${match[1]}.–${match[3]}. ${mName}`;
          } else {
            etaStr = rawStatus.replace(/arriving/i, "").trim();
          }
          progress = 1;
        }

        if (milestone === "SHIPPED") progress = Math.max(progress, 2);
        if (milestone === "OUT_FOR_DELIVERY") progress = Math.max(progress, 4);
      }

      let subText = "Amazon · ";
      if (isDelivered) {
        subText += (rawStatus || etaStr);
        if (deliveredTime) {
          const timeStr = fmtTime(deliveredTime);
          if (timeStr && !subText.includes(timeStr)) {
            subText = "Amazon · " + (etaStr === "Abgeholt" ? "Abgeholt um " : "Zugestellt um ") + timeStr + " Uhr";
          }
        }
      } else if (progress >= 4) {
        subText += "In Zustellung";
      } else if (progress >= 2) {
        subText += "Unterwegs";
      } else {
        subText += "Bestellt";
      }

      const events = (raw.events || []).map((e) => ({
        timestamp: e.timestamp,
        text: e.description || e.status,
        location: e.location
      }));

      let etaTimestamp = null;
      if (isPickupReady) {
        etaTimestamp = 0;
      } else if (isDelivered) {
        etaTimestamp = deliveredTime || now;
      } else if (isToday) {
        const d = new Date(now); d.setHours(12, 0, 0, 0); etaTimestamp = d.getTime();
      } else {
        etaTimestamp = parseArrivalTimestamp(rawStatus, now) || parseArrivalTimestamp(etaStr, now);
      }

      amzList.push({
        id: raw.order_id || p.barcode || Math.random().toString(),
        carrier: "amazon",
        carrierLabel: "Amazon",
        name: cleanName,
        barcode: trackingId || raw.order_id || p.barcode,
        statusText: rawStatus || "Bestellt",
        sub: subText,
        eta: etaStr,
        etaTimestamp: etaTimestamp,
        isToday: isToday,
        isPickup: isPickupReady,
        isDelivered: isDelivered,
        deliveredTime: deliveredTime,
        progress: progress,
        url: p.url || (raw.order_id ? `https://www.amazon.de/gp/your-account/order-details?orderID=${raw.order_id}` : null),
        events: events
      });
    }

    // Process Hermes parcels
    const hermesList = [];
    for (const p of rawHermesList) {
      if (!p) continue;
      const code = String(p.barcode || "").trim();
      const statusText = p.raw_status || p.status || "In Bearbeitung";
      const stLower = statusText.toLowerCase();

      const isDelivered = p.delivered === true || p.status === "delivered" || stLower.includes("zugestellt") || stLower.includes("abgeholt");
      const isPickup = !isDelivered && (p.pickup === true || p.status === "ready_for_pickup" || stLower.includes("paketshop") || stLower.includes("abholbereit"));

      let progress = p.progress || 2;
      if (isDelivered || isPickup) progress = 5;
      else if (p.status === "out_for_delivery" || stLower.includes("zustellung")) progress = Math.max(progress, 4);

      let etaStr = p.planned_from ? fmtDate(p.planned_from) : (progress >= 4 ? "Heute" : "Unterwegs");
      if (isPickup) etaStr = "Abholbereit";
      if (isDelivered) etaStr = "Zugestellt";

      let etaTimestamp = null;
      if (isPickup) etaTimestamp = 0;
      else if (isDelivered) etaTimestamp = now;
      else if (p.planned_from) {
        const d = new Date(p.planned_from);
        if (!isNaN(d.getTime())) etaTimestamp = d.getTime();
      }
      if (!etaTimestamp) etaTimestamp = parseArrivalTimestamp(etaStr, now) || parseArrivalTimestamp(statusText, now);

      hermesList.push({
        id: code || Math.random().toString(),
        carrier: "hermes",
        carrierLabel: "Hermes",
        name: cleanText(p.sender || "Hermes Sendung"),
        barcode: code,
        statusText: statusText,
        sub: "Hermes · " + statusText,
        eta: etaStr,
        etaTimestamp: etaTimestamp,
        isToday: etaStr === "Heute" || progress >= 4,
        isPickup: isPickup,
        isDelivered: isDelivered,
        deliveredTime: isDelivered ? now : null,
        progress: progress,
        url: p.url || (code ? `https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsdetails#${code}` : null),
        events: p.events || []
      });
    }

    // Process E-Mail / DPD / Otto parcels
    const emailList = [];
    for (const p of rawEmailList) {
      if (!p) continue;
      const carrier = String(p.carrier || "other").toLowerCase();
      const carrierLabel = p.carrierLabel || (carrier === "dpd" ? "DPD" : (carrier === "hermes" ? "Hermes" : "Paket"));
      const code = String(p.barcode || p.id || "").trim();
      const statusText = p.statusText || p.raw_status || "Unterwegs";
      const stLower = statusText.toLowerCase();

      const isDelivered = p.isDelivered || p.delivered === true || stLower.includes("zugestellt") || stLower.includes("abgeholt");
      const isPickup = !isDelivered && (p.isPickup === true || stLower.includes("pickup") || stLower.includes("abholbereit") || stLower.includes("paketshop"));

      let progress = p.progress || 2;
      if (isDelivered || isPickup) progress = 5;
      else if (stLower.includes("in zustellung") || stLower.includes("zustellfahrzeug") || stLower.includes("heute") || stLower.includes("beladen")) progress = Math.max(progress, 4);

      let etaStr = p.eta || (progress >= 4 ? "Heute" : "Unterwegs");
      if (isPickup) etaStr = "Abholbereit";
      if (isDelivered) etaStr = "Zugestellt";

      const todayMid = new Date(now);
      todayMid.setHours(0, 0, 0, 0);
      const todayStr = `${String(todayMid.getDate()).padStart(2, "0")}.${String(todayMid.getMonth() + 1).padStart(2, "0")}.${todayMid.getFullYear()}`;
      const todayShort = `${String(todayMid.getDate()).padStart(2, "0")}.${String(todayMid.getMonth() + 1).padStart(2, "0")}.`;

      let isToday = false;
      const rawSub = (p.sub || "").toLowerCase();
      if (
        etaStr.includes(todayStr) ||
        etaStr.includes(todayShort) ||
        etaStr.toLowerCase().includes("heute") ||
        stLower.includes("heute") ||
        rawSub.includes(todayStr) ||
        rawSub.includes(todayShort) ||
        rawSub.includes("heute")
      ) {
        isToday = true;
        etaStr = "Heute";
        progress = Math.max(progress, 4);
      } else if (etaStr === "Heute" || progress >= 4) {
        isToday = true;
      }

      let subText = p.sub || (carrierLabel + " · " + statusText);
      if (isToday && (subText.toLowerCase().includes("angekündigt") || subText.toLowerCase().includes("unterwegs") || subText.includes(todayStr))) {
        subText = carrierLabel + " · Zustellung heute";
      }

      let finalStatusText = statusText;
      if (isToday && (finalStatusText.toLowerCase().includes("angekündigt") || finalStatusText.toLowerCase().includes("unterwegs"))) {
        finalStatusText = "In Zustellung";
      }

      let etaTimestamp = p.etaTimestamp || null;
      if (isPickup) etaTimestamp = 0;
      else if (isDelivered) etaTimestamp = now;
      if (!etaTimestamp) etaTimestamp = parseArrivalTimestamp(etaStr, now) || parseArrivalTimestamp(statusText, now);

      emailList.push({
        id: code || Math.random().toString(),
        carrier: carrier,
        carrierLabel: carrierLabel,
        name: cleanText(p.name || p.sender || (carrierLabel + " Sendung")),
        barcode: code,
        statusText: finalStatusText,
        sub: subText,
        eta: etaStr,
        etaTimestamp: etaTimestamp,
        isToday: isToday,
        isPickup: isPickup,
        isDelivered: isDelivered,
        deliveredTime: isDelivered ? now : null,
        progress: progress,
        url: p.url || (carrier === "dpd" && code ? `https://tracking.dpd.de/status/de_DE/parcel/${code}` : (carrier === "ups" && code ? `https://www.ups.com/track?loc=de_DE&tracknum=${code}` : (carrier === "fedex" && code ? `https://www.fedex.com/fedextrack/?trknbr=${code}` : null))),
        events: p.events || []
      });
    }

    // Combine and sort:
    // 1. Abholbereit at the very top
    // 2. PRIMARY: Progress bars descending (5 -> 4 -> 3 -> 2 -> 1)
    // 3. For delivered items (both 5 bars): most recently delivered first
    // 4. SECONDARY: When progress bars are equal, sort by arrival date/day (earliest first)
    // 5. Alphabetical tie-breaker
    const all = [...dhlList, ...amzList, ...hermesList, ...emailList];
    all.sort((a, b) => {
      // 1. Abholbereit (waiting at Packstation/Filiale) ALWAYS at the very top!
      const aReady = a.isPickup && !a.isDelivered;
      const bReady = b.isPickup && !b.isDelivered;
      if (aReady !== bReady) return aReady ? -1 : 1;

      // 2. PRIMARY: Highest progress bar first (5 -> 4 -> 3 -> 2 -> 1)
      if (b.progress !== a.progress) return b.progress - a.progress;

      // 3. For delivered items (both 5 bars): most recently delivered first
      if (a.isDelivered && b.isDelivered) {
        const aTime = a.deliveredTime || 0;
        const bTime = b.deliveredTime || 0;
        if (bTime !== aTime) return bTime - aTime;
      }

      // 4. SECONDARY: When progress bars are EQUAL, sort by earliest arrival date/day first
      const aTime = a.etaTimestamp != null ? a.etaTimestamp : Infinity;
      const bTime = b.etaTimestamp != null ? b.etaTimestamp : Infinity;
      if (aTime !== bTime) return aTime - bTime;

      // 5. Alphabetical tie-breaker
      return a.name.localeCompare(b.name, 'de');
    });

    return all;
  }

    async _onRefresh(e) {
    if (e) e.stopPropagation();
    const btn = this._root.querySelector('#refresh-btn');
    if (btn) btn.classList.add('spinning');
    try {
      if (this._hass) {
        const promises = [];
        Object.keys(this._hass.states).forEach(id => {
          if (
            id.startsWith('sensor.pakete_') ||
            id.startsWith('sensor.dhl_') ||
            id.startsWith('sensor.amazon_') ||
            id.startsWith('sensor.hermes_') ||
            id.startsWith('sensor.imap_') ||
            id === 'sensor.e_mail_pakete'
          ) {
            promises.push(this._hass.callService('homeassistant', 'update_entity', { entity_id: id }).catch(() => {}));
          }
        });
        await Promise.allSettled(promises);
      }
    } finally {
      setTimeout(() => {
        if (btn) btn.classList.remove('spinning');
      }, 900);
    }
  }

  _render() {
    if (!this._root) return;
    const allParcels = this._collectParcels();
    const badgesEl = this._root.getElementById("badges");
    const bannerEl = this._root.getElementById("banner");
    const listEl = this._root.getElementById("list");
    const chipsEl = this._root.getElementById("carrier-chips");
    const titleTextEl = this._root.getElementById("title-text");
    const titleIconEl = this._root.getElementById("title-icon");

    const carrierLabels = {
      dhl: "DHL",
      amazon: "Amazon",
      dpd: "DPD",
      hermes: "Hermes",
      ups: "UPS",
      fedex: "FedEx"
    };

    const carrierColors = {
      dhl: "#FFCC00",
      amazon: "#FF9900",
      dpd: "#DC0032",
      hermes: "#0091CD",
      ups: "#FFB500",
      fedex: "#4D148C"
    };

    const isSingleCarrier = Boolean(this._config.carrier);
    const targetCarrier = (this._config.carrier || this._selectedCarrier || "all").toLowerCase();

    // Dynamischer Titel & Icon
    if (titleTextEl) {
      if (this._config.title) {
        titleTextEl.textContent = this._config.title;
      } else if (isSingleCarrier) {
        titleTextEl.textContent = (carrierLabels[targetCarrier] || targetCarrier.toUpperCase()) + " Sendungen";
      } else {
        titleTextEl.textContent = "Paketverfolgung";
      }
    }

    if (titleIconEl) {
      if (isSingleCarrier && this._icon(targetCarrier)) {
        titleIconEl.innerHTML = this._icon(targetCarrier);
      } else {
        titleIconEl.innerHTML = '<ha-icon icon="mdi:package-variant"></ha-icon>';
      }
    }

    // Filter Chips (nur in der Gesamt-Übersichtskarte)
    if (chipsEl) {
      if (isSingleCarrier || this._config.show_carrier_chips === false || allParcels.length === 0) {
        chipsEl.style.display = "none";
        chipsEl.innerHTML = "";
      } else {
        chipsEl.style.display = "flex";
        // Zähle Pakete pro Carrier
        const counts = { all: allParcels.filter(p => !p.isDelivered).length };
        Object.keys(carrierLabels).forEach(c => {
          counts[c] = allParcels.filter(p => !p.isDelivered && (p.carrier || '').toLowerCase() === c).length;
        });

        let chipsHtml = `<button class="chip ${this._selectedCarrier === 'all' ? 'active' : ''}" data-carrier="all">Alle (${counts.all})</button>`;
        Object.keys(carrierLabels).forEach(c => {
          if (counts[c] > 0 || this._selectedCarrier === c) {
            chipsHtml += `<button class="chip ${this._selectedCarrier === c ? 'active' : ''}" data-carrier="${c}"><span class="chip-dot" style="background:${carrierColors[c]}"></span>${carrierLabels[c]} (${counts[c]})</button>`;
          }
        });
        chipsEl.innerHTML = chipsHtml;

        chipsEl.querySelectorAll('.chip').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const chosen = btn.getAttribute('data-carrier');
            this._selectedCarrier = chosen;
            this._render();
          });
        });
      }
    }

    // Filtere Pakete für die Liste
    const parcels = (targetCarrier === "all")
      ? allParcels
      : allParcels.filter(p => (p.carrier || "").toLowerCase() === targetCarrier);
    if (this._config && this._config.max_height) {
      listEl.style.maxHeight = this._config.max_height;
    }

    const pickupParcels = parcels.filter((p) => p.isPickup && !p.isDelivered);
    const pickupCount = pickupParcels.length;
    const todayCount = parcels.filter((p) => p.isToday && !p.isPickup && !p.isDelivered).length;
    const deliveredCount = parcels.filter((p) => p.isDelivered).length;
    const activeCount = parcels.length - deliveredCount;

    let bHtml = "";
    if (pickupCount > 0) {
      bHtml += `<span class="badge pickup"><span class="dot"></span>${pickupCount === 1 ? "1 abholbereit" : pickupCount + " abholbereit"}</span>`;
    }
    if (todayCount > 0) {
      bHtml += `<span class="badge sure">${todayCount} heute</span>`;
    }
    if (activeCount > (pickupCount + todayCount)) {
      const openCount = activeCount - (pickupCount + todayCount);
      bHtml += `<span class="badge possible">${openCount} unterwegs</span>`;
    }
    if (deliveredCount > 0) {
      bHtml += `<span class="badge done">${deliveredCount === 1 ? "1 abgeholt" : deliveredCount + " abgeholt"}</span>`;
    }
    
    const refBtn = this._root.querySelector('#refresh-btn');
    if (refBtn && !refBtn._hasListener) {
      refBtn._hasListener = true;
      refBtn.addEventListener('click', (e) => this._onRefresh(e));
    }
badgesEl.innerHTML = bHtml;

    if (pickupCount > 0 && bannerEl) {
      bannerEl.innerHTML = `
        <div class="pickup-alert-banner">
          <div class="pickup-icon-box">
            <span class="spin-ring"></span>
            <span class="radar-ring"></span>
            <ha-icon icon="mdi:package-variant-closed"></ha-icon>
          </div>
          <div class="pickup-info">
            <span class="pickup-headline">${pickupCount === 1 ? "1 Paket liegt zum Abholen bereit!" : pickupCount + " Pakete liegen zum Abholen bereit!"}</span>
            <span class="pickup-subtext">Bereit zum Abholen an der Packstation / Filiale</span>
          </div>
        </div>
      `;
      bannerEl.style.display = "block";
    } else if (bannerEl) {
      bannerEl.innerHTML = "";
      bannerEl.style.display = "none";
    }

    if (!parcels.length) {
      listEl.innerHTML = `<div class="empty">Keine offenen Pakete unterwegs</div>`;
      return;
    }

    listEl.innerHTML = "";
    for (const p of parcels) {
      const open = this._open.has(p.id);
      const isPickup = p.isPickup && !p.isDelivered;
      const isDelivered = p.isDelivered;
      const item = document.createElement("div");
      item.className = "item" + (isPickup ? " is-pickup" : "") + (isDelivered ? " is-delivered" : "");

      const barHtml = `<div class="bar">${Array.from({ length: STEPS }, (_, i) => `<i class="${i < p.progress ? "on" : ""}"></i>`).join("")}</div>`;

      let rightEta = "";
      if (isPickup) {
        rightEta = `<span class="eta pickup-ready"><ha-icon icon="mdi:checkbox-marked-circle-outline"></ha-icon>${esc(p.eta)}</span>`;
      } else if (isDelivered) {
        rightEta = `<span class="eta delivered"><ha-icon icon="mdi:check-circle"></ha-icon>${esc(p.eta)}</span>`;
      } else {
        rightEta = `<span class="eta ${p.isToday ? "today" : ""}">${esc(p.eta)}</span>`;
      }

      const eventsHtml = (p.events && p.events.length)
        ? p.events.map((e) => `<div class="ev">${e.timestamp ? fmtDate(e.timestamp) + " " + fmtTime(e.timestamp) + " · " : ""}${esc(e.text)}${e.location ? " (" + esc(e.location) + ")" : ""}</div>`).join("")
        : `<div class="ev">${esc(p.statusText)}</div>`;

      const linkHtml = p.url
        ? `<div class="ids"><span>Nummer: <strong>${esc(p.barcode)}</strong></span><a class="go" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer"><ha-icon icon="mdi:open-in-new"></ha-icon> Sendung verfolgen</a></div>`
        : `<div class="ids"><span>Nummer: <strong>${esc(p.barcode)}</strong></span></div>`;

      item.innerHTML = `
        <button type="button" class="row-toggle" aria-expanded="${open ? "true" : "false"}">
          <div class="top">
            <div class="name">
              ${this._icon(p.carrier)}
              <span title="${esc(p.name)}">${esc(p.name)}</span>
            </div>
            <div class="right-box">
              ${rightEta}
              <span class="chev" aria-hidden="true"></span>
            </div>
          </div>
        </button>
        <div class="sub">${formatSubHtml(p.sub)}</div>
        ${barHtml}
        ${open ? `<div class="detail">${eventsHtml}${linkHtml}</div>` : ""}
      `;

      item.querySelector(".row-toggle").addEventListener("click", () => {
        if (open) this._open.delete(p.id);
        else this._open.add(p.id);
        this._render();
      });

      listEl.appendChild(item);
    }
  }

  getCardSize() {
    return 3;
  }
}

if (!customElements.get("unified-parcel-card")) {
  // Carrier SVG Icons für Statuskarten & Grid
const CARRIER_SVGS = {
  dhl: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#FFCC00"/><path fill="#D40511" transform="scale(2.2) translate(2.5, 4.5)" d="M4.22 10.303l-.767 1.043h4.18c.21 0 .208.078.105.218-.105.142-.28.39-.386.534-.054.073-.154.207.171.207h1.71l.505-.69c.314-.426.028-1.312-1.095-1.312H4.22zM11.424 10.303l-1.475 2.002h5.39l1.473-2.002H14.61l-.843 1.146h-.985l.846-1.146h-2.203zM17.529 10.303l-1.474 2.002h2.334l1.472-2.002H17.53zM4.684 11.603l-1.54 2.094h3.754c1.24 0 1.932-.844 2.145-1.136h-2.56c-.326 0-.226-.133-.172-.207.107-.143.283-.388.388-.53.104-.14.107-.22-.105-.22h-1.91zM9.762 12.562l-.836 1.136h2.203l.836-1.136H9.762zM12.947 12.562l-.836 1.136h2.203l.836-1.136h-2.203zM15.865 12.562s-.159.22-.238.326c-.276.374-.033.81.87.81h3.538l.834-1.136h-5.004z"/></svg>`,
  amazon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#232F3E"/><path fill="#FF9900" transform="scale(1.9) translate(4.5, 4.5)" d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076z"/></svg>`,
  dpd: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#DC0032"/><path fill="#FFFFFF" transform="scale(1.9) translate(4.5, 4.5)" d="M16.01 10.71a.364.364 0 01-.343-.006l-.558-.331a.43.43 0 01-.182-.312l-.014-.65a.363.363 0 01.165-.3l6.7-3.902L12.377.085A.799.799 0 0012 0a.798.798 0 00-.377.085l-9.4 5.124 10.53 6.13c.098.054.172.181.172.295v8.944c0 .112-.08.241-.178.294l-.567.315c-.171.062-.256.043-.361 0l-.569-.315a.362.362 0 01-.175-.294v-7.973a.223.223 0 00-.095-.156L1.702 7.048v10.579c0 .236.167.528.371.648l9.556 5.636c.102.06.237.09.371.089a.745.745 0 00.371-.09l9.557-5.635a.835.835 0 00.37-.648V7.047Z"/></svg>`,
  hermes: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0091CD"/><path fill="#FFFFFF" transform="scale(1.8) translate(5.5, 6)" d="m21.818 4.516-1.05 4.148h2.175L24 4.516M19.41 14.04h2.17l1.04-4.08h-2.178m-2.41 9.523h2.154l1.056-4.147h-2.16m.193-5.377H5.55v.92l3.341 3.161h9.349m2.41-9.525H0v1.116l3.206 3.032H19.6m-8.372 7.58 3.43 3.24h2.205l1.05-4.147h-6.685"/></svg>`,
  ups: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#351C15"/><path fill="#FFB500" transform="scale(1.9) translate(4.5, 4.5)" d="M11.668 14.544l-.028-5.226c.138-.055.387-.111.608-.111.995 0 1.41.774 1.41 2.682 0 1.853-.47 2.765-1.438 2.765-.22 0-.441-.055-.552-.11zM3.124 7.438c4.203-3.843 9.29-4.866 14.018-4.866 1.3 0 2.544.083 3.76.194h-.028v11.253c0 2.184-.774 3.926-2.295 5.171-1.355 1.134-5.447 2.959-6.581 3.456-1.161-.525-5.253-2.378-6.581-3.456-1.493-1.244-2.295-3.014-2.295-5.171V7.438zm12.664 2.599c.028.912.276 1.576 1.687 2.406.747.442 1.051.747 1.051 1.272 0 .581-.387.94-1.023.94-.553 0-1.189-.304-1.631-.691v1.576c.553.304 1.217.525 1.88.525 1.687 0 2.433-1.189 2.461-2.267.028-.995-.249-1.742-1.659-2.571-.608-.387-1.134-.636-1.106-1.244 0-.581.525-.802.995-.802.581 0 1.161.332 1.521.691V8.378c-.304-.221-.94-.581-1.88-.553-1.135.028-2.296.829-2.296 2.212zm-5.834 9.484h1.714l-.028-3.594c.166.028.415.083.774.083 1.908 0 2.986-1.687 2.986-4.175 0-2.461-1.106-4.009-3.152-4.009-.94 0-1.687.221-2.295.608v11.087zm-5.945-6.166c0 1.797.829 2.71 2.516 2.71 1.051 0 1.908-.249 2.571-.691V7.991H7.41v6.387c-.194.138-.47.221-.802.221-.774 0-.885-.719-.885-1.189V7.991H4.009v5.364zM22.12 2.295v11.723c0 2.516-.94 4.645-2.765 6.111-1.549 1.3-6.332 3.429-7.355 3.871-1.023-.442-5.806-2.571-7.355-3.843-1.797-1.465-2.765-3.594-2.765-6.111V2.295C4.756.747 8.074 0 12 0s7.244.747 10.12 2.295z"/></svg>`,
  fedex: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#4D148C"/><text x="7" y="42" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="25" fill="#FFFFFF" letter-spacing="-1">Fed</text><text x="39" y="42" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="25" fill="#FF6600" letter-spacing="-1">Ex</text></svg>`
};

class CarrierParcelCard extends UnifiedParcelCard {
  static getStubConfig(hass) {
    return {
      type: "custom:carrier-parcel-card",
      carrier: "dhl",
      title: "🟡 DHL Sendungen"
    };
  }
}

class PaketeStatusCard extends HTMLElement {
  static getStubConfig(hass) {
    return {
      type: "custom:pakete-status-card",
      title: "Pakete-Status"
    };
  }

  setConfig(config) {
    this._config = Object.assign({
      title: "Pakete-Status"
    }, config || {});
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._root) {
      this._build();
    }
    this._render();
  }

  _build() {
    this.attachShadow({ mode: "open" });
    this._root = this.shadowRoot;
    this._root.innerHTML = `
      <style>
        :host {
          display: block;
        }
        ha-card {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 4px 0 12px 0;
        }
        .header {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.2px;
          color: var(--primary-text-color, #fff);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 600px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .carrier-tile {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(28px) saturate(190%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(190%) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 12px 32px 0 rgba(0,0,0,0.28), 0 2px 6px 0 rgba(0,0,0,0.15) !important;
          border-radius: 24px;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .carrier-tile:hover {
          background: rgba(255, 255, 255, 0.14) !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }
        .carrier-tile:active {
          transform: scale(0.985) translateY(1px);
        }
        .icon-box {
          width: 44px;
          height: 44px;
          border-radius: 16px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          overflow: hidden;
          flex: none;
        }
        .icon-box svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .tile-primary {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--primary-text-color, #fff);
          letter-spacing: -0.2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        .tile-secondary {
          font-size: 12px;
          color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
          margin-top: 3px;
        }
      </style>
      <ha-card>
        <div class="header" id="header"></div>
        <div class="grid" id="grid"></div>
      </ha-card>
    `;
  }

  _getCarrierCount(c) {
    const h = this._hass;
    if (!h || !h.states) return 0;
    
    // 1. Aus den neuen Integrationssensoren
    const sKey = 'sensor.pakete_' + c;
    if (h.states[sKey] && !isNaN(parseInt(h.states[sKey].state, 10))) {
      return parseInt(h.states[sKey].state, 10);
    }
    
    // 2. Aus dem Gesamt-Sensor
    if (h.states['sensor.pakete_aktiv'] && h.states['sensor.pakete_aktiv'].attributes && Array.isArray(h.states['sensor.pakete_aktiv'].attributes.parcels)) {
      const list = h.states['sensor.pakete_aktiv'].attributes.parcels;
      return list.filter(p => !p.isDelivered && (p.carrier || '').toLowerCase() === c).length;
    }
    
    // 3. Fallbacks für bestehende Sensoren
    for (const [eid, sObj] of Object.entries(h.states)) {
      if (!sObj || !sObj.attributes || !Array.isArray(sObj.attributes.parcels)) continue;
      if (c === 'dhl' && eid.startsWith('sensor.dhl_') && eid.includes('eingehende_pakete')) {
        return sObj.attributes.parcels.length;
      }
      if (c === 'amazon' && eid.startsWith('sensor.amazon_') && eid.includes('eingehende_pakete')) {
        return sObj.attributes.parcels.length;
      }
      if (c === 'hermes' && eid.startsWith('sensor.hermes_') && eid.includes('eingehende_pakete')) {
        return sObj.attributes.parcels.length;
      }
    }

    if (h.states['sensor.e_mail_pakete'] && h.states['sensor.e_mail_pakete'].attributes && Array.isArray(h.states['sensor.e_mail_pakete'].attributes.parcels)) {
      return h.states['sensor.e_mail_pakete'].attributes.parcels.filter(p => (p.carrier || '').toLowerCase() === c).length;
    }
    return 0;
  }

  _render() {
    if (!this._root) return;
    const headerEl = this._root.getElementById('header');
    const gridEl = this._root.getElementById('grid');

    if (headerEl) {
      headerEl.textContent = this._config.title || "Pakete-Status";
    }

    const carriers = [
      { key: "dhl", name: "DHL Sendungen", url: "https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html", svg: CARRIER_SVGS.dhl },
      { key: "amazon", name: "Amazon Sendungen", url: "https://www.amazon.de/gp/your-account/order-history", svg: CARRIER_SVGS.amazon },
      { key: "dpd", name: "DPD Sendungen", url: "https://tracking.dpd.de/", svg: CARRIER_SVGS.dpd },
      { key: "hermes", name: "Hermes Sendungen", url: "https://www.myhermes.de/empfangen/sendungsverfolgung/", svg: CARRIER_SVGS.hermes },
      { key: "ups", name: "UPS Sendungen", url: "https://www.ups.com/track?loc=de_DE", svg: CARRIER_SVGS.ups },
      { key: "fedex", name: "FedEx Sendungen", url: "https://www.fedex.com/fedextrack/", svg: CARRIER_SVGS.fedex },
    ];

    gridEl.innerHTML = carriers.map(c => {
      const count = this._getCarrierCount(c.key);
      return `
        <a class="carrier-tile" href="${c.url}" target="_blank" rel="noopener noreferrer">
          <div class="icon-box">${c.svg}</div>
          <div class="tile-primary">${c.name}</div>
          <div class="tile-secondary">${count} ${count === 1 ? 'Paket' : 'Pakete'}</div>
        </a>
      `;
    }).join('');
  }
}

customElements.define("unified-parcel-card", UnifiedParcelCard);
customElements.define("carrier-parcel-card", CarrierParcelCard);
customElements.define("pakete-status-card", PaketeStatusCard);

window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: "unified-parcel-card",
    name: "Unified Parcel Tracker (Gesamt-Übersicht)",
    description: "Alle Paketdienste (DHL, Amazon, DPD, Hermes, UPS, FedEx) übersichtlich in einer Karte mit Schnellfiltern.",
    preview: true,
  },
  {
    type: "pakete-status-card",
    name: "Pakete-Status (Alle Paketdienste Grid)",
    description: "Vorkonfigurierte Kachel-Übersicht für DHL, Amazon, DPD, Hermes, UPS und FedEx mit Logos und Zählern.",
    preview: true,
  },
  {
    type: "carrier-parcel-card",
    name: "Paketdienst Einzel-Statuskarte (DHL / UPS / FedEx / Amazon)",
    description: "Statuskarte für einen spezifischen Paketdienst (z.B. carrier: dhl, carrier: ups, carrier: fedex).",
    preview: true,
  }
);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "unified-parcel-card",
    name: "Unified Parcel Card",
    description: "Kombinierte Paketkarte für DHL & Amazon im SoerenKaiser99 Design"
  });
}