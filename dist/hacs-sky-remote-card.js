function checkImageMapResizerLoaded() {
    return window.imageMapResize !== undefined && imageMapResize;
}
function addScriptToHead(scriptName) {
    var script = document.createElement("SCRIPT");
    script.src = scriptName;
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);
}

function withImageMapResizer(callback) {
    if (checkImageMapResizerLoaded()) {
        callback();
    }
    addScriptToHead(import.meta.url.split("/").slice(0,-1).join("/")+'/imageMapResizer.js');

    // Poll for imageMapResize to come into existance
    var checkReady = function () {
        if (checkImageMapResizerLoaded()) {
            callback();
        }
        else {
            window.setTimeout(function () { checkReady(); }, 20);
        }
    };
    checkReady()
}

class SkyRemoteCardHA extends HTMLElement {
    // Whenever the state changes, a new `hass` object is set. Use this to
    // update your content.
    set hass(hass)
    {
      // Initialize the content if it's not there yet.
      if (!this.content) {
        this.innerHTML = `
          <ha-card header="${this.config.title||""}" style="height: 100%; display: flex; flex-direction: column;">
            <div class="card-content" style="flex: 1; overflow: hidden"></div>
          </ha-card>
        `;
        this.content = this.querySelector("div");
      }

      const entityId = this.config.entity;
      const state = hass.states[entityId];
      const stateStr = state ? state.state : "unavailable";
      const imageURL = import.meta.url.split("/").slice(0,-1).join("/")+"/skyplus.png"
      this.content.innerHTML = `
        <div style="height: 100%">
            <div style="height: 100%; display: flex; justify-content: center; overflow: hidden">
                <img class="skyremote" id="image" src="${imageURL}" alt="" usemap="#Map" style="width: auto; max-height: 100%;"/>
                <map name="Map" id="Map">
                <area alt="" title="Sky" data-key-name="sky" href="#" shape="poly" coords="467,187,471,171,485,164,508,159,536,161,553,167,561,177,563,195,555,206,532,214,507,215,482,209,470,200" />
                <area alt="" title="Power" data-key-name="power" href="#" shape="poly" coords="625,111,639,115,647,123,653,134,653,152,643,160,634,166,617,164,601,155,597,140,599,122,615,110" />
                <area alt="" title="TV Guide" data-key-name="tvguide" href="#" shape="poly" coords="335,296,345,289,355,283,375,281,392,281,407,284,421,292,425,304,416,315,403,326,379,328,361,328,342,320,333,310" />
                <area alt="" title="Box Office" data-key-name="boxoffice" href="#" shape="poly" coords="407,240,415,233,423,230,436,228,451,226,467,226,478,230,491,238,494,250,486,264,468,271,446,273,428,270,413,266,403,252" />
                <area alt="" title="Services" data-key-name="services" href="#" shape="poly" coords="533,243,543,235,555,227,572,225,595,226,618,234,629,248,619,263,600,272,569,274,545,268,533,258" />
                <area alt="" title="Interactive" data-key-name="interactive" href="#" shape="poly" coords="604,297,620,287,635,281,661,281,682,286,696,299,695,317,672,329,645,331,621,325,609,317" />
                <area alt="" title="Info" data-key-name="i" href="#" shape="poly" coords="548,341,553,332,559,326,572,323,586,328,593,336,593,350,587,363,574,366,563,366,552,363" />
                <area alt="" title="Up" data-key-name="up" href="#" shape="poly" coords="498,433,483,434,470,433,465,424,467,414,473,406,487,396,511,381,524,382,541,391,558,409,564,421,564,428,553,436" />
                <area alt="" title="Down" data-key-name="down" href="#" shape="poly" coords="476,543,497,547,518,548,534,546,548,546,562,549,563,562,554,578,526,595,515,600,498,597,485,587,475,575,465,563,466,551" />
                <area alt="" title="Left" data-key-name="left" href="#" shape="poly" coords="406,489,411,474,418,462,428,453,439,443,446,443,454,443,460,449,460,460,457,480,457,489,459,504,461,515,461,527,452,536,444,539,430,532,407,498" />
                <area alt="" title="Right" data-key-name="right" href="#" shape="poly" coords="590,443,604,455,612,462,623,479,623,491,618,507,607,522,596,533,585,537,575,535,570,526,572,490,569,459,570,449,583,441" />
                <area alt="" title="Select" data-key-name="select" href="#" shape="poly" coords="482,470,488,461,500,456,509,454,524,454,540,459,548,468,551,479,553,495,547,509,540,518,531,525,518,528,505,527,494,522,482,512,477,500,477,482" />
                <area alt="" title="Channel Up" data-key-name="channelup" href="#" shape="poly" coords="659,483,692,483,692,460,685,441,679,424,674,411,665,401,654,398,641,400,632,410,628,421,628,432" />
                <area alt="" title="Channel Down" data-key-name="channeldown" href="#" shape="poly" coords="658,488,692,488,695,498,691,517,688,532,685,545,678,564,671,576,655,582,642,577,634,570,628,557" />
                <area alt="" title="Back Up" data-key-name="backup" href="#" shape="poly" coords="477,622,485,619,497,619,513,621,526,620,537,620,553,623,558,635,555,651,540,661,522,664,500,662,488,661,475,654,471,637" />
                <area alt="" title="Text" data-key-name="text" href="#" shape="poly" coords="378,625,381,620,387,616,398,613,407,613,414,619,421,628,421,639,418,648,410,653,400,659,389,655,381,647,375,640" />
                <area alt="" title="Help" data-key-name="help" href="#" shape="poly" coords="609,624,619,615,629,614,640,614,648,619,655,629,650,644,644,652,635,657,628,657,620,653,611,651" />
                <area alt="" title="Play" data-key-name="play" href="#" shape="poly" coords="452,728,468,733,484,738,498,740,514,740,525,740,538,739,549,736,557,734,566,729,573,729,573,739,569,753,560,766,545,772,538,776,524,780,510,780,498,780,476,770,460,752" />
                <area alt="" title="Pause" data-key-name="pause" href="#" shape="poly" coords="462,679,483,685,501,685,514,687,531,686,548,685,561,681,570,683,574,693,577,704,578,714,578,722,565,726,548,731,538,733,527,735,513,735,498,733,487,731,473,731,461,725,452,722,451,705" />
                <area alt="" title="Rewind" data-key-name="rewind" href="#" shape="poly" coords="389,696,404,693,415,697,422,702,427,715,429,728,430,741,425,751,417,760,405,761,394,761,385,748,379,734,380,703" />
                <area alt="" title="Fast Forward" data-key-name="fastforward" href="#" shape="poly" coords="602,729,603,716,608,702,616,697,626,695,638,696,646,702,651,715,649,736,644,749,634,758,619,761,607,754,601,743" />
                <area alt="" title="Record" data-key-name="record" href="#" shape="poly" coords="433,794,439,790,449,786,465,787,471,794,480,798,493,805,496,817,496,828,491,836,481,842,470,844,457,840,434,826,428,812" />
                <area alt="" title="Stop" data-key-name="stop" href="#" shape="poly" coords="539,805,569,789,584,788,596,794,601,807,597,819,568,843,553,843,538,835,534,818" />
                <area alt="" title="Red" data-key-name="red" href="#" shape="poly" coords="393,856,399,853,410,850,421,852,427,859,429,873,423,885,409,889,398,886,388,871" />
                <area alt="" title="Green" data-key-name="green" href="#" shape="poly" coords="463,875,470,872,478,871,489,872,495,878,497,893,490,906,476,909,463,904,456,890" />
                <area alt="" title="Yellow" data-key-name="yellow" href="#" shape="poly" coords="536,880,542,873,554,870,569,878,573,890,571,903,557,910,541,905,533,894" />
                <area alt="" title="Blue" data-key-name="blue" href="#" shape="poly" coords="605,856,614,848,635,852,642,863,641,879,629,887,616,888,604,881,601,865" />
                <area alt="" title="1" data-key-name="1" href="#" shape="poly" coords="402,953,408,945,421,938,439,938,453,948,460,963,454,981,442,990,428,993,416,991,401,978" />
                <area alt="" title="2" data-key-name="2" href="#" shape="poly" coords="487,969,492,957,499,951,510,946,526,948,542,956,544,971,541,989,532,997,518,1002,498,1000,486,987" />
                <area alt="" title="3" data-key-name="3" href="#" shape="poly" coords="591,935,612,938,623,947,631,962,627,978,616,991,598,992,578,986,572,966,576,947" />
                <area alt="" title="4" data-key-name="4" href="#" shape="poly" coords="402,1032,414,1021,433,1018,449,1024,456,1035,457,1049,453,1064,438,1072,418,1073,404,1062,397,1046" />
                <area alt="" title="5" data-key-name="5" href="#" shape="poly" coords="490,1039,498,1030,511,1026,524,1027,535,1032,544,1042,544,1058,539,1073,525,1082,503,1082,490,1071,483,1054" />
                <area alt="" title="6" data-key-name="6" href="#" shape="poly" coords="581,1024,593,1018,608,1018,621,1022,628,1032,629,1047,625,1063,611,1073,595,1073,583,1070,573,1058,573,1033" />
                <area alt="" title="7" data-key-name="7" href="#" shape="poly" coords="401,1119,408,1106,420,1100,434,1099,451,1106,458,1121,458,1136,444,1151,431,1156,417,1156,405,1146,399,1134" />
                <area alt="" title="8" data-key-name="8" href="#" shape="poly" coords="494,1115,506,1108,518,1105,530,1110,539,1116,544,1137,538,1153,525,1164,505,1164,492,1154,483,1136" />
                <area alt="" title="9" data-key-name="9" href="#" shape="poly" coords="574,1109,588,1102,600,1099,617,1102,627,1113,631,1126,628,1140,620,1151,603,1157,584,1153,570,1133" />
                <area alt="" title="0" data-key-name="0" href="#" shape="poly" coords="506,1188,520,1188,535,1196,543,1205,544,1218,541,1235,531,1242,515,1245,501,1242,489,1229,486,1215,492,1195" />
                </map>
            </div>
            </div>
      `;

        var that = this;
        withImageMapResizer(function () {
          const map = that.content.querySelector("map");
          map.querySelectorAll("area").forEach((area) => {
            area.onclick = () => {
              hass.callService("remote", "send_command", {
                  entity_id: that.config.entity,
                  command: area.getAttribute("data-key-name"),
              });
              return false;
            };
          })
            imageMapResize(map, that.content.querySelector("img"));
        })

    }

    // The user supplied configuration. Throw an exception and Home Assistant
    // will render an error card.
    setConfig(config) {
      if (!config.entity) {
        throw new Error("You need to define an entity");
      }
      this.config = config;
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns in masonry view
    getCardSize() {
      return 5;
    }

    // The rules for sizing your card in the grid in sections view
    getGridOptions() {
      return {
        rows: 6,
        columns: 6,
        min_columns: 2,
        min_rows: 4,
      };
    }

  static getConfigForm() {
    // Define the form schema.
    const SCHEMA = [
      {name: "title", required: false, selector: { text:{} }},
      { name: "entity", required: true, selector: { entity: { filter: { integration: "sky_remote" } } } },
    ];

    // A simple assertion function to validate the configuration.
    const assertConfig = (config) => {
      if (!config.entity || typeof config.entity !== "string") {
        throw new Error('Configuration error: "entity" must be a non-empty string.');
      }
    };

    // computeLabel returns a localized label for a schema item.
    const computeLabel = (schema, localize) => {
      return localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
    };

    return {
      schema: SCHEMA,
      assertConfig: assertConfig,
      computeLabel: computeLabel,
    };
  }



  static getStubConfig() {
    return{
    title: 'Sky Remote Card',
    entity: 'remote.example',
  };
  }
   }

  customElements.define("sky-remote-card", SkyRemoteCardHA);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "sky-remote-card",
    name: "Sky Remote Card",
    description: "Sky Remote Card is a custom Home Assistant card representing a Sky box remote for use with Sky Remote Control integration",
    preview: false,
    fields: [
      {
        name: "entity",
        type: "entity",
        required: true,
        description: "The entity ID of the Sky Remote Control entity",
      },
    ],
  })