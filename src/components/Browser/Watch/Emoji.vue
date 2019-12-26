<template>
  <div class="ms-emoji">
    <div class="ms-emoji-main">
      <div class="ms-emoji-header">
        <div class="ms-emoji-hed-action">
          <div class="ms-emoji-search">
            <input
              type="search"
              placeholder="Emoji search..."
              class="ms-emoji-search"
            />
          </div>
          <ul class="ms-emoji-action">
            <li class="ms-s65">
              <svg viewBox="0 0 24 24" width="28px" height="28px" x="0" y="0">
                <path
                  d="M13,4.32L9.31,8,13,11.69,11.69,13,8,9.31,4.31,13,3,11.69,6.69,8,3,4.31,4.31,3,8,6.69,11.68,3Z"
                  class="ms-emoji-close"
                ></path>
              </svg>
            </li>
          </ul>
        </div>
      </div>
      <div class="ms-emoji-content">
        <div class="ms-emoji-wk">
          <div class="ms-emoji-title">People</div>
          <div class="ms-emoji-list" data-name="people">
            <button
              class="ms-emoji-button"
              data-emoji="😀"
              data-title="Grinning Face"
              style=""
            >
              😀
            </button>
          </div>
        </div>
      </div>
      <ul class="ms-emoji-head">
        <li class="ms-emoji-head">
          <button class="ms-emoji-group" data-title="people">😀</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'emoji',
  data() {
    return {};
  },
  methods: {
    convert(textString) {
      textString = textString.replace(/ /g, '-');
      textString = textString.replace(/</g, '');
      textString = textString.replace(/>/g, '');
      textString = textString.replace(/"/g, '');
      textString = textString.replace(/é/g, '');
      textString = textString.replace(/!/g, '');
      textString = textString.replace(/'/, '');
      textString = textString.replace(/£/, '');
      textString = textString.replace(/^/, '');
      textString = textString.replace(/#/, '');
      textString = textString.replace(/$/, '');
      textString = textString.replace(/\+/g, '');
      textString = textString.replace(/%/g, '');
      textString = textString.replace(/½/g, '');
      textString = textString.replace(/&/g, '');
      textString = textString.replace(/\//g, '');
      textString = textString.replace(/{/g, '');
      textString = textString.replace(/\(/g, '');
      textString = textString.replace(/\[/g, '');
      textString = textString.replace(/\)/g, '');
      textString = textString.replace(/]/g, '');
      textString = textString.replace(/=/g, '');
      textString = textString.replace(/}/g, '');
      textString = textString.replace(/\?/g, '');
      textString = textString.replace(/\*/g, '');
      textString = textString.replace(/@/g, '');
      textString = textString.replace(/€/g, '');
      textString = textString.replace(/~/g, '');
      textString = textString.replace(/æ/g, '');
      textString = textString.replace(/ß/g, '');
      textString = textString.replace(/;/g, '');
      textString = textString.replace(/,/g, '');
      textString = textString.replace(/`/g, '');
      textString = textString.replace(/|/g, '');
      textString = textString.replace(/\./g, '');
      textString = textString.replace(/:/g, '');
      textString = textString.replace(/İ/g, 'i');
      textString = textString.replace(/I/g, 'i');
      textString = textString.replace(/ı/g, 'i');
      textString = textString.replace(/ğ/g, 'g');
      textString = textString.replace(/Ğ/g, 'g');
      textString = textString.replace(/ü/g, 'u');
      textString = textString.replace(/Ü/g, 'u');
      textString = textString.replace(/ş/g, 's');
      textString = textString.replace(/Ş/g, 's');
      textString = textString.replace(/ö/g, 'o');
      textString = textString.replace(/Ö/g, 'o');
      textString = textString.replace(/ç/g, 'c');
      textString = textString.replace(/Ç/g, 'c');
      textString = textString.replace(/--/g, '-');
      textString = textString.replace(/---/g, '-');
      textString = textString.replace(/----/g, '-');
      textString = textString.replace(/----/g, '-');

      return textString.toLowerCase();
    },
    //  C = {
    // 	main: ".ms-emoji-main",
    // 	header: ".ms-emoji-header",
    // 	content: ".ms-emoji-content",
    // 	list: ".ms-emoji-wk",
    // 	title: ".ms-emoji-title",
    // 	listemoji: ".ms-emoji-list",
    // 	emoji: ".ms-emoji-button"
    // },
    // H = {
    // 	main: '<div class="'+C.main.replace(".", "")+'"></div>',
    // 	header: '<div class="'+C.header.replace(".", "")+'"></div>',
    // 	content: '<div class="'+C.content.replace(".", "")+'"></div>',
    // 	list: '<div class="'+C.list.replace(".", "")+'"></div>',
    // 	title: '<div class="'+C.title.replace(".", "")+'">{title}</div>',
    // 	listemoji: '<div class="'+C.listemoji.replace(".", "")+'" data-name="{dataTitle}"></div>',
    // 	emoji: '<button class="'+C.emoji.replace(".", "")+'" data-emoji="{emojiAlt}" data-title="{title}">{emoji}</button>',
    // },
    // F = {
    // 	A: function(lang){
    //         F.E(msEmo, input);
    // 	},
    // 	H:function(emj){
    // 		e(C.header).append('<div class="ms-emoji-hed-action"></div>');
    // 		e(".ms-emoji-hed-action").append('<div class="ms-emoji-search"><input type="search" placeholder="'+input+'" class="ms-emoji-search"></div>');
    // 		e(".ms-emoji-hed-action").append('<ul class="ms-emoji-action"><li class="ms-s65"><svg viewBox="0 0 24 24" width="28px" height="28px" x="0" y="0"><path d="M13,4.32L9.31,8,13,11.69,11.69,13,8,9.31,4.31,13,3,11.69,6.69,8,3,4.31,4.31,3,8,6.69,11.68,3Z" class="ms-emoji-close"></path></svg></li></ul>');

    // 		e(C.main).append('<ul class="ms-emoji-head"></ul>');

    // 	},
    // 	E: function(emojies, input){
    // 		if(emojies.length > 0){
    // 			this.mainClass.append(H.main);
    // 			e(C.main).append(H.header);
    // 			e(C.main).append(H.content);
    // 			e(C.content).append(H.list);
    // 			F.H(input);
    // 			F.Title(emojies);
    // 		}
    // 	},
    // 	Title:function(emoji){
    // 		var em = "";
    // 		$.each(emoji, function(i, emj) {
    // 			em += H.title.replace('{title}', emj.name);
    // 			e(C.list).append(H.title.replace('{title}', emj.name));
    // 			e(C.list).append(H.listemoji.replace('{dataTitle}', convert(emj.name)));
    // 			F.Emoji("[data-name="+convert(emj.name)+"]", emj.emojies)

    // 			e("ul.ms-emoji-head").append(
    // 				'<li class="ms-emoji-head"><button class="ms-emoji-group" data-title="'+convert(emj.name)+'">'+emj.emojies[0].emj+'</button></li>'
    // 				);
    // 			console.log(  )
    // 		})
    // 	},
    // 	Emoji: function(eBlock, emoji){
    // 		e.each(emoji, function(i, moji) {
    // 			e(eBlock).append(
    // 				H.emoji
    // 				.replace('{title}', moji.title)
    // 				.replace('{emoji}', moji.emj)
    // 				.replace('{emojiAlt}', moji.emj)
    // 				)
    // 		})
    // 	},
    // 	Search: function(){
    // 		e(document).on("keyup", 'input.ms-emoji-search', function(){
    // 			var s = convert(e(this).val());
    // 			console.log(s)
    // 			e('.ms-emoji-button').each(function(){
    // 				var t = convert(e(this).data("title")),
    // 				l = t.indexOf(s) !== -1;
    // 				e(this).toggle(l);
    // 			})
    // 		})
    // 	},
    // 	Click: function(){
    // 		e(document).on('click', 'button.ms-emoji-group', function(ev) {
    // 			ev.preventDefault();

    // 			var h = 0;
    // 			e('.ms-emoji-wk > div').each(function(index, el) {
    // 				h += e(this).height()
    // 			})

    // 			var
    // 			t = e(this).data("title"),
    // 			tt = e('[data-name="'+t+'"]'),
    // 			s = tt.offset().top,
    // 			eh = tt.height();

    // 			console.log(  s , e('.ms-emoji-wk').scrollTop()  )

    // 			e('.ms-emoji-wk').animate({
    // 				scrollTop: s - 85
    // 			});
    // 			});

    // 	},
    // 	Scroll: function(){
    // 		e('.ms-emoji-wk').scroll( function() {
    //     var T = e(this);
    // 			var scrollDistance = T.scrollTop();
    // 			$('.ms-emoji-list').each(function(i) {
    // 				if (e(this).position().top <= scrollDistance) {
    // 					e('.navigation a.active').removeClass('active');
    // 					e('.navigation a').eq(i).addClass('active');
    // 				}

    // 			});
    // 		}).scroll();
    // 	},
    // 	Init: function(mainClass, o){
    // 		this.lang = o.lang;
    // 		this.input = o.input;
    // 		this.mainClass = mainClass
    // 		F.A(this.lang),F.Click(),F.Scroll(),F.Search();
    // 	}
    // }
  },
};
</script>

<style scoped>
@charset "UTF-8";

.ms-emoji-main,
.ms-emoji-header {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: 0 0;
}

.ms-emoji {
  position: relative;
  margin: auto;
}
.ms-emoji-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ms-emoji-main {
  background-clip: padding-box;
  box-shadow: 0 0 0 1px #eee, 0 6px 9px rgba(0, 0, 0, 0.1);
  transition: box-shadow 83ms;
  background-color: #fff;
  /*position: absolute;*/
  padding: 0;
  bottom: 34px;
  overflow: visible;
  z-index: 2;
  left: -2px;
}
.ms-emoji-main::before {
  border-top: 9px solid rgba(0, 0, 0, 0.1);
  border-left-width: 9px;
  border-right-width: 9px;
  bottom: -9px;
  margin-left: -10px;
}
.ms-emoji-main::after,
.ms-emoji-main::before {
  position: absolute;
  border-color: rgba(248, 249, 250, 0);
  border-style: solid;
  border-width: 0;
  content: '';
  height: 0;
  width: 0;
  left: 23px;
}
.ms-emoji-main::after {
  border-top: 8px solid #f8f9fa;
  border-left-width: 8px;
  border-right-width: 8px;
  bottom: -8px;
  margin-left: -9px;
}
.ms-emoji-main {
  border-radius: 8px;
}
.ms-emoji-header {
  overflow: hidden;
}

.ms-emoji-main {
  width: 300px;
  height: 350px;
  padding: 8px;
  overflow: hidden;
  position: absolute;
  display: block;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

input.ms-emoji-search {
  font-size: 14px;
  line-height: 1.42857;
  font-weight: 400;
  transition-duration: 334ms;
  transition-property: border-color, box-shadow;
  box-shadow: none;
  border-radius: 8px;
  border: 2px solid #f8f9fa;
  padding: 0 10px;
  width: 100%;
  outline: 0;
  height: 30px;
  box-sizing: border-box;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.9);
}
.ms-emoji-action {
  border: 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  display: inline-block;
  font-size: 0;
  font-weight: 600;
  font-family: inherit;
  height: 24px;
  outline-width: 2px;
  position: relative;
  transition-duration: 167ms;
  transition-property: background-color, box-shadow, color;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  vertical-align: middle;
  border-radius: 12px;
}
.ms-emoji-action {
  margin-left: 5px;
  height: 30px;
}
.ms-emoji-action {
  background-color: rgba(0, 0, 0, 0);
  line-height: 24px;
  padding: 0;
  text-align: center;
  text-decoration: none;
  z-index: 0;
  text-indent: -999px;
}

.ms-emoji-search {
  width: 100%;
}
.ms-emoji-search {
  float: left;
}
path.-ms-emoji-close {
  fill: #424242;
}

.ms-emoji-action > li.ms-s65 {
}
.ms-emoji-action > li.ms-s65 {
  border-radius: 8px;
  background: #f8f9fa;
  width: 30px;
  height: 30px;
  position: relative;
  display: block;
  cursor: pointer;
}
.ms-emoji-action > li.ms-s65 > svg {
  position: relative;
  display: block;
  text-align: center;
  padding: 5px 5px;
  line-height: 0;
  margin: 0;
  width: 28px;
  height: 28px;
}

/*
*/
.ms-emoji-hed-action {
  display: flex;
  flex: 1;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.ms-emoji-search {
  display: flex;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  -ms-flex: 1 1 0.000000001px;
  -webkit-flex: 1;
  flex: 1;
  -webkit-flex-basis: 0.000000001px;
  flex-basis: 0.000000001px;
  order: 1;
}
ul.ms-emoji-action {
  display: flex;
  width: 100%;
  max-width: 32px;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -ms-flex-pack: end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  display: flex;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  order: 2;
}
.ms-emoji-hed-action {
  padding-bottom: 5px;
}
ul.ms-emoji-head {
  display: flex;
  flex: 1;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  padding: 5px 10px;
  list-style: none;
  background: #f8f9fa;
  margin: 0 -8px;
}
ul.ms-emoji-head > .ms-emoji-head {
  display: flex;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
  -ms-flex: 1 1 0.000000001px;
  -webkit-flex: 1;
  flex: 1;
  -webkit-flex-basis: 0.000000001px;
  flex-basis: 0.000000001px;
  order: 1;
}
button.ms-emoji-group {
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  background: #f8f9fa;
  font-size: 20px;
}
.ms-emoji-content {
  border: 2px solid #f8f9fa;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}
.ms-emoji-title {
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  background: #f8f9fa;
  height: 20px;
  padding: 5px;
}
.ms-emoji-wk {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 274px;
  display: block;
  margin-right: -17px;
}
.ms-emoji-content::-webkit-scrollbar-corner {
  background-color: #ecedf5;
}
.ms-emoji-content::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}
.ms-emoji-content::-webkit-scrollbar {
  width: 8px;
  margin-left: 10px;
  background-color: transparent;
  background: transparent;
}
.ms-emoji-content::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
  background: transparent;
  transition: 1s ease;
}
.ms-emoji-content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  border: solid transparent;
  border-width: 4px 3px;
  background-color: rgba(255, 255, 255, 0.5);
}
.ms-emoji-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
.ms-emoji-content::-webkit-scrollbar-thumb:active {
  background-color: rgba(255, 255, 255, 0.8);
}
.ms-emoji-content::-webkit-scrollbar-track:hover {
  background-color: rgba(255, 255, 255, 0.3);
  -webkit-box-shadow: inset -1px 1px 0 rgba(255, 255, 255, 0.1),
    inset 1px -1px 0 rgba(255, 255, 255, 0.1);
}

button.ms-emoji-button {
  font-family: Segoe UI Emoji, Source Sans Pro, Helvetica, sans-serif;
  touch-action: manipulation;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 162ms;
  font-size: 22px;
}
.ms-emoji-list > button.ms-emoji-button {
  display: inline-block;
  border-radius: 8px;
  height: 36px;
  width: 36px;
  vertical-align: top;
  text-align: center;
  background: #f8f9fa;
  border: none;
  margin: 2px 3px;
  padding: 0;
  justify-content: center;
  justify-items: center;
  align-items: center;
}
button.ms-emoji-button {
  outline: none;
  cursor: pointer;
}
button.ms-emoji-button:hover {
  transform: scale(1.5);
  outline-width: 2px;
}
</style>
