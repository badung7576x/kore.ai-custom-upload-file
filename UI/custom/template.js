var chatFooterTemplate =
'<div class="footerContainer pos-relative"> \
    {{if userAgentIE}} \
        <div role="textbox" class="chatInputBox inputCursor" aria-label="Message" aria-label="Message" contenteditable="true" placeholder="${botMessages.message}"></div> \
    {{else}} \
        <div role="textbox" class="chatInputBox" contenteditable="true" placeholder="${botMessages.message}"></div> \
    {{/if}} \
<div class="attachment"></div> \
    {{if isTTSEnabled}} \
        <div class="sdkFooterIcon ttspeakerDiv ttsOff"> \
            <button class="ttspeaker" title="Talk to speak"> \
                <span class="ttsSpeakerEnable"></span> \
                <span class="ttsSpeakerDisable"></span> \
                <span style="display:none;"><audio id="ttspeaker" controls="" autoplay="" name="media"><source src="" type="audio/wav"></audio></span>\
            </button> \
        </div> \
    {{/if}} \
{{if isSpeechEnabled}}\
    <div class="sdkFooterIcon microphoneBtn"> \
        <button class="notRecordingMicrophone" title="Microphone On"> \
            <i class="microphone"></i> \
        </button> \
        <button class="recordingMicrophone" title="Microphone Off" > \
            <i class="microphone"></i> \
            <span class="recordingGif"></span> \
        </button> \
        <div id="textFromServer"></div> \
    </div> \
{{/if}}\
    <div class="sdkFooterIcon"> \
        <input type="file" name="Attachment" class="filety" id="captureAttachmnts"> \
    </div> \
{{if !(isSendButton)}}<div class="chatSendMsg">${botMessages.entertosend}</div>{{/if}} \
</div>';

var chatWindowTemplate = '<script id="chat_window_tmpl" type="text/x-jqury-tmpl"> \
<div class="kore-chat-window droppable liteTheme-one"> \
<div class="kr-wiz-menu-chat defaultTheme-kore">\
</div>	\
    <div class="minimized-title"></div> \
    <div class="minimized"><span class="messages"></span></div> \
    <div class="kore-chat-header"> \
        <div id="botHeaderTitle" aria-labelledby="botHeaderTitle" class="header-title" title="${chatTitle}">${chatTitle}</div> \
        <div class="chat-box-controls"> \
            {{if botMessages.availableLanguages}}\
                <select class="lang-selector" >\
                    {{each(key, lang) botMessages.availableLanguages}} \
                        <option  {{if botMessages.selectedLanguage===lang}}selected{{/if}} value="${lang}">${lang}</option>\
                    {{/each}}\
                </select>\
            {{/if}}\
            <button class="reload-btn" title="${botMessages.reconnectText}"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTMgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5yZWxvYWQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNTcuMDAwMDAwLCAtMjQxLjAwMDAwMCkiIGZpbGw9IiM4QTk1OUYiIHN0cm9rZT0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJyZWxvYWQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM1OC4wMDAwMDAsIDI0Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC44LDUuMjczNTc2NTggQzEwLjgsMi4zNjU3MTQyIDguMzc3NTg1NzEsMCA1LjQwMDAyMzg3LDAgQzIuNDIyNDYyMDMsMCAwLDIuMzY1NzE0MiAwLDUuMjczNTc2NTggQzAsNS40NDYzMTE0MiAwLjE0MzQwNjM1Myw1LjU4NjM1OTc2IDAuMzIwMjgyOTQyLDUuNTg2MzU5NzYgQzAuNDk3MTU5NTMsNS41ODYzNTk3NiAwLjY0MDU2NTg4Myw1LjQ0NjI4ODEgMC42NDA1NjU4ODMsNS4yNzM1NzY1OCBDMC42NDA1NjU4ODMsMi43MTA2NDc2NSAyLjc3NTY0MjI2LDAuNjI1NTg5NjY4IDUuNCwwLjYyNTU4OTY2OCBDOC4wMjQzNTc3NCwwLjYyNTU4OTY2OCAxMC4xNTk0MzQxLDIuNzEwNjcwOTYgMTAuMTU5NDM0MSw1LjI3MzU3NjU4IEMxMC4xNTk0MzQxLDcuODM2NDU4ODkgOC4wMjQzNTc3NCw5LjkyMTU0MDE4IDUuNCw5LjkyMTU0MDE4IEw0Ljg0NDMyNzI0LDkuOTIxNTQwMTggTDUuNjM4ODc1MzEsOS4wNTI5NzAwMyBDNS43NTY3MzczMyw4LjkyNDE1OTEyIDUuNzQ1MzAyMDYsOC43MjY0MDgxNiA1LjYxMzQwMjYsOC42MTEzMDYgQzUuNDgxNTAzMTMsOC40OTYyMDM4NSA1LjI3ODk4NjcyLDguNTA3Mzk0NjYgNS4xNjExNDg1Nyw4LjYzNjIwNTU2IEw0LjAyNTM1Njg4LDkuODc3ODAyNzYgQzMuODM5NDMyMzUsMTAuMDgxMDU1OSAzLjgzOTQzMjM1LDEwLjM4NzU5MDggNC4wMjUzNTY4OCwxMC41OTA4NDQgTDUuMTYxMTQ4NTcsMTEuODMyNDQxMiBDNS4yMjQ0MzY0NCwxMS45MDE2Mzc3IDUuMzEyMDc0OTgsMTEuOTM2ODQyMSA1LjQwMDExOTM3LDExLjkzNjg0MjEgQzUuNDc2MDYwMDQsMTEuOTM2ODQyMSA1LjU1MjMxMTA2LDExLjkxMDU5MDMgNS42MTM0MDI2LDExLjg1NzM0MDcgQzUuNzQ1MzI1OTQsMTEuNzQyMjM4NiA1Ljc1NjczNzMzLDExLjU0NDQ4NzYgNS42Mzg4NzUzMSwxMS40MTU2NzY3IEw0Ljg0NDMyNzI0LDEwLjU0NzEwNjUgTDUuNCwxMC41NDcxMDY1IEM4LjM3NzU4NTcxLDEwLjU0NzEwNjUgMTAuOCw4LjE4MTM5MjM0IDEwLjgsNS4yNzM1NzY1OCBaIiBpZD0iUGF0aCI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="></button> \
            <button class="minimize-btn" title="${botMessages.minimizeText}"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIycHgiIHZpZXdCb3g9IjAgMCAxNCAyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1Mi4zICg2NzI5NykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bWluaW1pemU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMjYuMDAwMDAwLCAtMjMzLjAwMDAwMCkiIGZpbGw9IiM4QTk1OUYiPgogICAgICAgICAgICA8ZyBpZD0ibWluaW1pemUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMyNi4wMDAwMDAsIDIzMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBwb2ludHM9IjAgMCAxMy45Mzk5OTk2IDAgMTMuOTM5OTk5NiAxLjk5OTk5OTk0IDAgMS45OTk5OTk5NCI+PC9wb2x5Z29uPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="></button> \
            <button class="expand-btn" title="${botMessages.expandText}"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5leHBhbmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQXJ0Ym9hcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMDUuMDAwMDAwLCAtMjUyLjAwMDAwMCkiIGZpbGw9IiM4QTk1OUYiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxnIGlkPSJleHBhbmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwNS4wMDAwMDAsIDI1Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjg2NjY2NjY3LDkuMzMzMzMzMzMgTDAsOS4zMzMzMzMzMyBMMCwxNCBMNC42NjY2NjY2NywxNCBMNC42NjY2NjY2NywxMi4xMzMzMzMzIEwxLjg2NjY2NjY3LDEyLjEzMzMzMzMgTDEuODY2NjY2NjcsOS4zMzMzMzMzMyBaIE0wLDQuNjY2NjY2NjcgTDEuODY2NjY2NjcsNC42NjY2NjY2NyBMMS44NjY2NjY2NywxLjg2NjY2NjY3IEw0LjY2NjY2NjY3LDEuODY2NjY2NjcgTDQuNjY2NjY2NjcsMCBMMCwwIEwwLDQuNjY2NjY2NjcgWiBNMTIuMTMzMzMzMywxMi4xMzMzMzMzIEw5LjMzMzMzMzMzLDEyLjEzMzMzMzMgTDkuMzMzMzMzMzMsMTQgTDE0LDE0IEwxNCw5LjMzMzMzMzMzIEwxMi4xMzMzMzMzLDkuMzMzMzMzMzMgTDEyLjEzMzMzMzMsMTIuMTMzMzMzMyBaIE05LjMzMzMzMzMzLDAgTDkuMzMzMzMzMzMsMS44NjY2NjY2NyBMMTIuMTMzMzMzMywxLjg2NjY2NjY3IEwxMi4xMzMzMzMzLDQuNjY2NjY2NjcgTDE0LDQuNjY2NjY2NjcgTDE0LDAgTDkuMzMzMzMzMzMsMCBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
            <button class="close-btn" title="${botMessages.expandText}"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button> \
        </div> \
    </div> \
    <div class="kore-chat-header historyLoadingDiv"> \
        <div class="historyWarningTextDiv displayTable"> \
            <span><img class = "loadingHistory" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAYZJREFUOBGtVLFKA0EQfbMiiERQEgjpRQt/wULB/opIFCuJvb1iKdprbbASDaa4L9DCX7BQ7CVwQcEggph13t7t3RlivMKBsDsz701mZ9+eYNjaNyX0e9saDmCxZJv1mrQ6zxDcayxEqXyOxmo/TzN5B2fXDbxFT7D2VH9rgK3FeV3pM848cTnLirQ6e0q60lw1lx+11bziHD5Oi1tcZVfAkyIYOYRM3GF69gHvr4uwX8sY2AMFVDwIkA3srLcFnAFb9B2I3GJqchNbQTcDJ7uLsIqPz0s91koS6WKmMm+SIfojRL8WIIuF+QdAlBSpks+ZBEkA7gijOkgBumGeR80sMLzG1OcMilgep3wDseWUxyEWsTnzmMKUr51ILw3wForYy2AhhSlfO3FKjGO8xiKWxymfgw1THnXAaxxnzMd68ajQuLcAeE1UnA5+K+R1kgmuS/4/KdY3xbdgB0fe/XMVs49m/Zi4uBPPiN/Qibrj5qJHl12+GU/7WYTRoe+J0xFlMOZ78g1n4achujvX7QAAAABJRU5ErkJggg=="></span> \
            <p class="headerTip warningTip">${botMessages.loadinghistory}</p> \
        </div> \
    </div> \
    <div class="kore-chat-header trainWarningDiv"> \
        <div class="trainWarningTextDiv displayTable"> \
            <span class="exclamation-circle"><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span> \
            <p class="headerTip warningTip">Something went wrong.Please try again later.</p> \
        </div> \
    </div> \
    <div role="log" aria-live="polite" aria-atomic="true" class="kore-chat-body"> \
        <div class="errorMsgBlock"> \
        </div> \
        <ul class="chat-container"></ul> \
    </div> \
    <div class="typingIndicatorContent"><div class="typingIndicator"></div><div class="movingDots"></div></div> \
    <div class="kore-chat-footer disableFooter">' + chatFooterTemplate + '{{if isSendButton}}<div class="sendBtnCnt"><button class="sendButton disabled" type="button">${botMessages.sendText}</button></div>{{/if}}</div> \
     <div id="myModal" class="modalImagePreview">\
          <span class="closeImagePreview">&times;</span>\
          <img class="modal-content-imagePreview" id="img01">\
          <div id="caption"></div>\
    </div>\
    <div id="chatBodyModal" class="chatBodyModal animate-bottom">\
    <span class="closeChatBodyModal" aira-label="Close Form" role="button" tabindex="0" aria-atomic="true"></span>\
    <div id="closeInlineModel" class="loading_form iframeLoader"></div>\
    <div id="chatBodyModalContent"></div>\
    </div>\
    <div id="myPreviewModal" class="modalImagePreview">\
          <span class="closeElePreview">&times;</span>\
          <div class="largePreviewContent"></div>\
    </div>\
    <div class="kr-wiz-content-chat defaultTheme-kore">\
    </div>\
</div> \
</script>';

var msgTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
    {{if msgData.message}} \
        {{each(key, msgItem) msgData.message}} \
            {{if msgItem.cInfo && msgItem.type === "text"}} \
                <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                     class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}}\ {{if msgData.icon}}with-icon{{/if}} {{if msgData.fromAgent}}from-agent{{/if}}"> \
                    {{if msgData.createdOn}}<div aria-hidden="true" aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                    {{if msgData.icon}}<div aria-hidden="true"  aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})" title="User Avatar"></div> </div> {{/if}} \
                    <div class="messageBubble" aria-live="assertive">\
                        <div> \
                            {{if msgData.type === "bot_response"}} \
                                {{if msgItem.component  && msgItem.component.type =="error"}} \
                                    <span style="color:${msgItem.component.payload.color}">{{html helpers.convertMDtoHTML(msgItem.component.payload.text, "bot",msgItem)}} </span>\
                                {{else}} \
                                    <span class="simpleMsg" {{if msgData}}msgData="${JSON.stringify(msgData)}" {{/if}}>{{html helpers.convertMDtoHTML(msgItem.cInfo.body, "bot",msgItem)}}</span> \
                                    {{if msgItem.component && msgItem.component.payload && msgItem.component.payload.videoUrl}}\
                                        <div class="videoEle"><video width="300" controls><source src="${msgItem.component.payload.videoUrl}" type="video/mp4"></video></div>\
                                    {{/if}}\
                                    {{if msgItem.component && msgItem.component.payload && msgItem.component.payload.audioUrl}}\
                                        <div class="audioEle"><audio width="180" controls><source src="${msgItem.component.payload.audioUrl}"></audio></div>\
                                    {{/if}}\
                                {{/if}} \
                            {{else}} \
                                {{if msgItem.cInfo.renderMsg && msgItem.cInfo.renderMsg !== ""}}\
                                    {{html helpers.convertMDtoHTML(msgItem.cInfo.renderMsg, "user",msgItem)}} \
                                {{else}}\
                                    {{html helpers.convertMDtoHTML(msgItem.cInfo.body, "user",msgItem)}} \
                                {{/if}}\
                            {{/if}} \
                        </div>\
                        {{if msgItem.cInfo && msgItem.cInfo.emoji}} \
                            <span class="emojione emojione-${msgItem.cInfo.emoji[0].code}">${msgItem.cInfo.emoji[0].title}</span> \
                        {{/if}} \
                        {{if msgItem.cInfo.attachments}} \
                            <div class="msgCmpt attachments" fileid="${msgItem.cInfo.attachments[0].fileId}"> \
                                <div class="uploadedFileIcon"> \
                                    {{if msgItem.cInfo.attachments[0].fileType == "image"}} \
                                        <span class="icon cf-icon icon-photos_active"></span> \
                                    {{else msgItem.cInfo.attachments[0].fileType == "audio"}}\
                                        <span class="icon cf-icon icon-files_audio"></span> \
                                    {{else msgItem.cInfo.attachments[0].fileType == "video"}} \
                                        <span class="icon cf-icon icon-video_active"></span> \
                                    {{else}} \
                                        {{if extension[1]=="xlsx" || extension[1]=="xls" || extension[1]=="docx" || extension[1]=="doc" || extension[1]=="pdf" || extension[1]=="ppsx" || extension[1]=="pptx" || extension[1]=="ppt" || extension[1]=="zip" || extension[1]=="rar"}}\
                                            <span class="icon cf-icon icon-files_${extension[1]}"></span> \
                                        {{else extension[1]}}\
                                            <span class="icon cf-icon icon-files_other_doc"></span> \
                                        {{/if}}\
                                    {{/if}}\
                                </div> \
                                <div class="curUseruploadedFileName">${msgItem.cInfo.attachments[0].fileName}</div> \
                            </div> \
                        {{/if}} \
                        {{if msgData.isError}} \
                            <div class="errorMsg">Send Failed. Please resend.</div> \
                        {{/if}} \
                    </div> \
                </li> \
            {{/if}} \
        {{/each}} \
    {{/if}} \
</scipt>';
    var templateAttachment = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    {{each(key, msgItem) msgData.message}} \
        {{if msgItem.component && msgItem.component.payload.url}} \
            <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} {{if msgData.icon}}with-icon{{/if}}"> \
                {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                {{if msgData.icon}}<div class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                <div class="messageBubble">\
                    {{if msgItem.component.payload.url}} \
                        <div class="msgCmpt botResponseAttachments" fileid="${msgItem.component.payload.url}"> \
                            <div class="uploadedFileIcon"> \
                                {{if msgItem.component.type == "image"}} \
                                    <span class="icon cf-icon icon-photos_active"></span> \
                                {{else msgItem.component.type == "audio"}}\
                                    <span class="icon cf-icon icon-files_audio"></span> \
                                {{else msgItem.component.type == "video"}} \
                                    <span class="icon cf-icon icon-video_active"></span> \
                                {{else}} \
                                    {{if extension[1]=="xlsx" || extension[1]=="xls" || extension[1]=="docx" || extension[1]=="doc" || extension[1]=="pdf" || extension[1]=="ppsx" || extension[1]=="pptx" || extension[1]=="ppt" || extension[1]=="zip" || extension[1]=="rar"}}\
                                        <span class="icon cf-icon icon-files_${extension[1]}"></span> \
                                    {{else extension[1]}}\
                                        <span class="icon cf-icon icon-files_other_doc"></span> \
                                    {{/if}}\
                                {{/if}}\
                            </div> \
                            <div class="botuploadedFileName">${extractedFileName}</div> \
                        </div> \
                    {{/if}} \
                </div> \
            </li> \
        {{/if}} \
    {{/each}} \
{{/if}} \
</scipt>';
var popupTemplate = '<script id="kore_popup_tmpl" type="text/x-jquery-tmpl"> \
    <div class="kore-auth-layover">\
        <div class="kore-auth-popup"> \
            <div class="popup_controls"><span class="close-popup" title="Close">&times;</span></div> \
            <iframe id="authIframe" src="${link_url}"></iframe> \
        </div> \
    </div>\
</script>';
var buttonTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
        <div class="buttonTmplContent"> \
            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
            {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
            <ul class="buttonTmplContentBox">\
                <li class="buttonTmplContentHeading"> \
                    {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                    {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                        <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                    {{/if}} \
                </li>\
                {{each(key, msgItem) msgData.message[0].component.payload.buttons}} \
                    <a>\
                        <li {{if msgData}}msgData="${JSON.stringify(msgData)}"{{/if}} {{if msgItem.payload}}value="${msgItem.payload}"{{/if}} {{if msgItem.payload}}actual-value="${msgItem.payload}"{{/if}} {{if msgItem.url}}url="${msgItem.url}"{{/if}} class="buttonTmplContentChild" data-value="${msgItem.value}" type="${msgItem.type}">\
                            ${msgItem.title}\
                        </li> \
                    </a> \
                {{/each}} \
            </ul>\
        </div>\
    </li> \
{{/if}} \
</scipt>';

var pieChartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon piechart"> \
        {{if msgData.createdOn}}<div class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
        {{if msgData.icon}}<div class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
        {{if msgData.message[0].component.payload.text}}<div class="messageBubble pieChart">\
            <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
        </div>{{/if}}\
        <div id="d3Pie">\
        </div>\
        <div class="piechartDiv">\
            <div class="lineChartChildDiv" id="piechart${msgData.messageId}"></div>\
        </div>\
    </li> \
{{/if}} \
</scipt>';

var barchartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon barchart"> \
        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
        {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
        {{if msgData.message[0].component.payload.text}}<div class="messageBubble barchart">\
            <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
        </div>{{/if}}\
        <div class="barchartDiv">\
            <div class="lineChartChildDiv" id="barchart${msgData.messageId}"></div>\
        </div>\
    </li> \
{{/if}} \
</scipt>';
var linechartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon linechart"> \
        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
        {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
        {{if msgData.message[0].component.payload.text}}<div class="messageBubble linechart">\
            <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
        </div>{{/if}}\
        <div class="linechartDiv">\
            <div class="lineChartChildDiv" id="linechart${msgData.messageId}"></div>\
        </div>\
    </li> \
{{/if}} \
</scipt>';
var miniTableChartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon tablechart"> \
        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
        {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
        {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
            <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
        </div>{{/if}}\
        {{each(key, table) msgData.message[0].component.payload.elements}}\
            <div class="minitableDiv">\
                <div style="overflow-x:auto; padding: 0 8px;">\
                    <table cellspacing="0" cellpadding="0">\
                        <tr class="headerTitle">\
                            {{each(key, tableHeader) table.primary}} \
                                <th {{if tableHeader[1]}}style="text-align:${tableHeader[1]};" {{/if}}>${tableHeader[0]}</th>\
                            {{/each}} \
                        </tr>\
                        {{each(key, additional) table.additional}} \
                            <tr>\
                                {{each(cellkey, cellValue) additional}} \
                                    <td  {{if cellkey === additional.length-1}}colspan="2"{{/if}}  {{if table.primary[cellkey][1]}}style="text-align:${table.primary[cellkey][1]};" {{/if}} title="${cellValue}">${cellValue}</td>\
                                {{/each}} \
                            </tr>\
                        {{/each}} \
                    </table>\
                </div>\
            </div>\
        {{/each}}\
    </li> \
{{/if}} \
</scipt>';
var miniTableHorizontalTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
<li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
    class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon tablechart"> \
    {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
    {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
    {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
        <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
    </div>{{/if}}\
    <div class="carousel" id="carousel-one-by-one" style="height: 0px;">\
        {{each(key, table) msgData.message[0].component.payload.elements}}\
            <div class="slide">\
                <div class="minitableDiv">\
                    <div style="overflow-x:auto; padding: 0 8px;">\
                        <table cellspacing="0" cellpadding="0">\
                            <tr class="headerTitle">\
                                {{each(key, tableHeader) table.primary}} \
                                    <th {{if tableHeader[1]}}style="text-align:${tableHeader[1]};" {{/if}}>${tableHeader[0]}</th>\
                                {{/each}} \
                            </tr>\
                            {{each(key, additional) table.additional}} \
                                <tr>\
                                    {{each(cellkey, cellValue) additional}} \
                                        <td  {{if cellkey === additional.length-1}}colspan="2"{{/if}}  {{if table.primary[cellkey][1]}}style="text-align:${table.primary[cellkey][1]};" {{/if}} title="${cellValue}">${cellValue}</td>\
                                    {{/each}} \
                                </tr>\
                            {{/each}} \
                        </table>\
                    </div>\
                </div>\
            </div>\
        {{/each}}\
    </div>\
</li> \
{{/if}} \
</scipt>';
var tableChartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon tablechart"> \
        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
        {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
        {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
            <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
        </div>{{/if}}\
        <div class="tablechartDiv {{if msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}regular{{else}}hide{{/if}}">\
            <div style="overflow-x:auto; padding: 0 8px;">\
                <table cellspacing="0" cellpadding="0">\
                    <tr class="headerTitle">\
                        {{each(key, tableHeader) msgData.message[0].component.payload.columns}} \
                            <th {{if tableHeader[1]}}style="text-align:${tableHeader[1]};"{{/if}}>${tableHeader[0]}</th>\
                        {{/each}} \
                    </tr>\
                    {{each(key, tableRow) msgData.message[0].component.payload.elements}} \
                        {{if tableRow.Values.length>1}}\
                            <tr {{if key > 4}}class="hide"{{/if}}>\
                                {{each(cellkey, cellValue) tableRow.Values}} \
                                    <td  {{if cellkey === tableRow.Values.length-1}}colspan="2"{{/if}} class=" {{if key == 0}} addTopBorder {{/if}}" {{if msgData.message[0].component.payload.columns[cellkey][1]}}style="text-align:${msgData.message[0].component.payload.columns[cellkey][1]};" {{/if}} title="${cellValue}">${cellValue}</td>\
                                {{/each}} \
                            </tr>\
                        {{/if}}\
                    {{/each}} \
                </table>\
            </div>\
            {{if msgData.message[0].component.payload.elements.length > 5 && msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}<div class="showMore">Show more</div>{{/if}}\
        </div>\
         <div class="accordionTable {{if msgData.message[0].component.payload.table_design && msgData.message[0].component.payload.table_design == "regular"}}hide{{else}}responsive{{/if}}">\
            {{each(key, tableRow) msgData.message[0].component.payload.elements}} \
                {{if key < 4}}\
                    <div class="accordionRow">\
                        {{each(cellkey, cellValue) tableRow.Values}} \
                            {{if cellkey < 2}}\
                                <div class="accordionCol">\
                                    <div class="colTitle hideSdkEle">${msgData.message[0].component.payload.columns[cellkey][0]}</div>\
                                    <div class="colVal">${cellValue}</div>\
                                </div>\
                            {{else}}\
                                <div class="accordionCol hideSdkEle">\
                                    <div class="colTitle">${msgData.message[0].component.payload.columns[cellkey][0]}</div>\
                                    <div class="colVal">${cellValue}</div>\
                                </div>\
                            {{/if}}\
                        {{/each}} \
                        <span class="fa fa-caret-right tableBtn"></span>\
                    </div>\
                {{/if}}\
            {{/each}} \
            <div class="showMore">Show more</div>\
        </div>\
    </li> \
{{/if}} \
</scipt>';


var carouselTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
        {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
        {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
        {{if msgData.message[0].component.payload.text}}<div class="messageBubble tableChart">\
            <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
        </div>{{/if}}\
        <div class="carousel" id="carousel-one-by-one" style="height: 0px;">\
            {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                <div class="slide">\
                    {{if msgItem.image_url}} \
                        <div class="carouselImageContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                            <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                        </div> \
                    {{/if}} \
                    <div class="carouselTitleBox"> \
                        <p class="carouselTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</p> \
                        {{if msgItem.subtitle}}<p class="carouselDescription">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</p>{{/if}} \
                        {{if msgItem.default_action && msgItem.default_action.type === "web_url"}}<div class="listItemPath carouselDefaultAction" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                        {{if msgItem.buttons}} \
                            {{each(key, msgBtn) msgItem.buttons}} \
                                <div {{if msgBtn.payload}}value="${msgBtn.payload}"{{/if}} {{if msgBtn.url}}url="${msgBtn.url}"{{/if}} class="listItemPath carouselButton" data-value="${msgBtn.value}" type="${msgBtn.type}">\
                                    ${msgBtn.title}\
                                </div> \
                            {{/each}} \
                        {{/if}} \
                    </div>\
                </div>\
            {{/each}} \
        </div>\
    </li> \
{{/if}}\
</scipt>';

var quickReplyTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon quickReplies"> \
        <div class="buttonTmplContent"> \
            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
            {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar marginT50" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
            {{if msgData.message[0].component.payload.text}} \
                <div class="buttonTmplContentHeading quickReply"> \
                    {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                    {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                        <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                    {{/if}} \
                </div>\
                {{/if}} \
                {{if msgData.message[0].component.payload.quick_replies && msgData.message[0].component.payload.quick_replies.length}} \
                <div class="fa fa-chevron-left quickreplyLeftIcon hide"></div><div class="fa fa-chevron-right quickreplyRightIcon"></div>\
                    <div class="quick_replies_btn_parent"><div class="autoWidth">\
                        {{each(key, msgItem) msgData.message[0].component.payload.quick_replies}} \
                            <div class="buttonTmplContentChild quickReplyDiv"> <span {{if msgItem.payload}}value="${msgItem.payload}"{{/if}} class="quickReply {{if msgItem.image_url}}with-img{{/if}}" type="${msgItem.content_type}">\
                                {{if msgItem.image_url}}<img src="${msgItem.image_url}">{{/if}} <span class="quickreplyText {{if msgItem.image_url}}with-img{{/if}}">${msgItem.title}</span></span>\
                            </div> \
                        {{/each}} \
                    </div>\
                </div>\
            {{/if}} \
        </div>\
    </li> \
{{/if}} \
</scipt>';
var listTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
        <div class="listTmplContent"> \
            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
            {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
            <ul class="listTmplContentBox"> \
                {{if msgData.message[0].component.payload.text || msgData.message[0].component.payload.heading}} \
                    <li class="listTmplContentHeading"> \
                        {{if msgData.type === "bot_response" && msgData.message[0].component.payload.heading}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.heading, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                        {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                            <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                        {{/if}} \
                    </li> \
                {{/if}} \
                {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                    {{if msgData.message[0].component.payload.buttons}} \
                        {{if key<= 2 }}\
                            <li class="listTmplContentChild"> \
                                {{if msgItem.image_url}} \
                                    <div class="listRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                        <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                    </div> \
                                {{/if}} \
                                <div class="listLeftContent"> \
                                    <div class="listItemTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                    {{if msgItem.subtitle}}<div class="listItemSubtitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                    {{if msgItem.default_action && msgItem.default_action.url}}<div class="listItemPath" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                    {{if msgItem.buttons}}\
                                    <div> \
                                        <span class="buyBtn" {{if msgItem.buttons[0].type}}type="${msgItem.buttons[0].type}"{{/if}} {{if msgItem.buttons[0].url}}url="${msgItem.buttons[0].url}"{{/if}} {{if msgItem.buttons[0].payload}}value="${msgItem.buttons[0].payload}"{{/if}}>{{if msgItem.buttons[0].title}}${msgItem.buttons[0].title}{{else}}Buy{{/if}}</span> \
                                    </div> \
                                    {{/if}}\
                                </div>\
                            </li> \
                        {{/if}}\
                    {{else}} \
                        <li class="listTmplContentChild"> \
                            {{if msgItem.image_url}} \
                                <div class="listRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                    <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';" /> \
                                </div> \
                            {{/if}} \
                            <div class="listLeftContent"> \
                                <div class="listItemTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                {{if msgItem.subtitle}}<div class="listItemSubtitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                {{if msgItem.default_action && msgItem.default_action.url}}<div class="listItemPath" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                {{if msgItem.buttons}}\
                                <div> \
                                    <span class="buyBtn" {{if msgItem.buttons[0].type}}type="${msgItem.buttons[0].type}"{{/if}} {{if msgItem.buttons[0].url}}url="${msgItem.buttons[0].url}"{{/if}} {{if msgItem.buttons[0].payload}}value="${msgItem.buttons[0].payload}"{{/if}}>{{if msgItem.buttons[0].title}}${msgItem.buttons[0].title}{{else}}Buy{{/if}}</span> \
                                </div> \
                                {{/if}}\
                            </div>\
                        </li> \
                    {{/if}} \
                {{/each}} \
                </li> \
                {{if msgData.message[0].component.AlwaysShowGlobalButtons || (msgData.message[0].component.payload.elements.length > 3 && msgData.message[0].component.payload.buttons)}}\
                <li class="viewMoreList"> \
                    <span class="viewMore" url="{{if msgData.message[0].component.payload.buttons[0].url}}${msgData.message[0].component.payload.buttons[0].url}{{/if}}" type="${msgData.message[0].component.payload.buttons[0].type}" value="{{if msgData.message[0].component.payload.buttons[0].payload}}${msgData.message[0].component.payload.buttons[0].payload}{{else}}${msgData.message[0].component.payload.buttons[0].title}{{/if}}">${msgData.message[0].component.payload.buttons[0].title}</span> \
                </li> \
                {{/if}}\
            </ul> \
        </div> \
    </li> \
{{/if}} \
</scipt>';
var listActionSheetTemplate = '<script id="chat-window-listTemplate" type="text/x-jqury-tmpl">\
<div class="list-template-sheet hide">\
{{if msgData.message}} \
<div class="sheetHeader">\
 <span class="choose">${msgData.message[0].component.payload.heading}</span>\
 <button class="close-button" title="Close"><img src="data:image/svg+xml;base64,           PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjMgKDY3Mjk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJBcnRib2FyZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM0NC4wMDAwMDAsIC0yMjkuMDAwMDAwKSIgZmlsbD0iIzhBOTU5RiI+CiAgICAgICAgICAgIDxnIGlkPSJjbG9zZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ0LjAwMDAwMCwgMjI5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBwb2ludHM9IjE0IDEuNCAxMi42IDAgNyA1LjYgMS40IDAgMCAxLjQgNS42IDcgMCAxMi42IDEuNCAxNCA3IDguNCAxMi42IDE0IDE0IDEyLjYgOC40IDciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"></button>\
</div>\
<div class="listTemplateContainer" >\
    <div class="displayMonth">\
        {{each(key, tab) tabs}} \
            <span class="tabs" data-tabid="${tab}"><span class="btnBG">${tab}</span></span>\
        {{/each}}\
    </div>\
      <ul class="displayListValues">\
          {{each(key, msgItem) dataItems}} \
               <li class="listViewTmplContentChild"> \
                     {{if msgItem.image_url}} \
                         <div class="listViewRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                            <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                        </div> \
                    {{/if}} \
                        <div class="listViewLeftContent" data-url="${msgItem.default_action.url}" data-title="${msgItem.default_action.title}" data-value="${msgItem.default_action.title}"> \
                           <span class="titleDesc">\
                               <div class="listViewItemTitle" title="${msgItem.title}">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                {{if msgItem.subtitle}}<div class="listViewItemSubtitle" title="${msgItem.subtitle}">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                            </span>\
                                {{if msgItem.value}}<div class="listViewItemValue" title="${msgItem.value}">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.value, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.value, "user")}} {{/if}}</div>{{/if}} \
                        </div>\
                </li> \
           {{/each}} \
       </ul> \
</div>\
{{/if}}\
</div>\
</script>';
var iframe = '<script id="chat_message_tmpl" type="text/x-jquery-tmpl"> \
    {{if link_url}}\
       {{if (msgData && msgData.renderType ==="inline")}}\
            <li class="inlineIframeContainer"> \
                <div class="iframeBubble"> \
                        <div class="uiformComponent">\
                        <div id="closeInlineModel" role="region" aria-live="polite" aria-atomic="true" aira-label="close Form" class="loading_form iframeLoader"></div>\
                        <iframe id="inlineIframeModal" src="${link_url}"></iframe> \
                        </div>\
                </div>\
            </li> \
        {{else}}\
            <iframe role="region" aria-live="polite" aria-atomic="true" aira-label="Loadig Form" id="iframeModal" src="${link_url}"></iframe> \
        {{/if}}\
    {{else}}\
        <div role="region" aria-live="polite" aria-atomic="true" class="failedIframe">Failed to load iFrame</div>\
    {{/if}}\
</script>';

var uploadTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
{{if msgData.message}} \
    <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
        class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
        <div class="buttonTmplContent"> \
            {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
            {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
            <ul class="buttonTmplContentBox">\
                <li class="buttonTmplContentHeading"> \
                    {{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                    {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                        <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                    {{/if}} \
                </li>\
                <a>\
                    <li data-value="${msgData.message[0].component.payload.buttons[0].value}" type="${msgData.message[0].component.payload.buttons[0].type}" id="customUploadBtn" class="buttonTmplContentChild">\
                            <i class="paperclip"></i> \
                    </li> \
                </a> \
            </ul>\
        </div>\
    </li> \
{{/if}} \
</scipt>'