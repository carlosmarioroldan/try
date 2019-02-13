(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{854:function(e,t,n){"use strict";n.r(t);var o=monaco.Promise,r=function(){function e(e,t){var n=this;this._modeId=e,this._defaults=t,this._worker=null,this._idleCheckInterval=setInterval(function(){return n._checkIfIdle()},3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(function(){return n._stopWorker()})}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},e.prototype._checkIfIdle=function(){if(this._worker){var e=this._defaults.getWorkerMaxIdleTime(),t=Date.now()-this._lastUsedTime;e>0&&t>e&&this._stopWorker()}},e.prototype._getClient=function(){var e=this;if(this._lastUsedTime=Date.now(),!this._client){this._worker=monaco.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs()}});var t=this._worker.getProxy();this._defaults.getEagerModelSync()&&(t=t.then(function(t){return e._worker.withSyncedResources(monaco.editor.getModels().filter(function(t){return t.getModeId()===e._modeId}).map(function(e){return e.uri}))})),this._client=t}return this._client},e.prototype.getLanguageServiceWorker=function(){for(var e,t=this,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return function(e){var t,n,r=new o(function(e,o){t=e,n=o},function(){});return e.then(t,n),r}(this._getClient().then(function(t){e=t}).then(function(e){return t._worker.withSyncedResources(n)}).then(function(t){return e}))},e}();var i,a=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),s=monaco.Uri,u=monaco.Promise;function c(e){return e?e.map(function(e){return e.text}).join(""):""}!function(e){e[e.None=0]="None",e[e.Block=1]="Block",e[e.Smart=2]="Smart"}(i||(i={}));var l=function(){function e(e){this._worker=e}return e.prototype._positionToOffset=function(e,t){return monaco.editor.getModel(e).getOffsetAt(t)},e.prototype._offsetToPosition=function(e,t){return monaco.editor.getModel(e).getPositionAt(t)},e.prototype._textSpanToRange=function(e,t){var n=this._offsetToPosition(e,t.start),o=this._offsetToPosition(e,t.start+t.length);return{startLineNumber:n.lineNumber,startColumn:n.column,endLineNumber:o.lineNumber,endColumn:o.column}},e}(),p=function(e){function t(t,n,o){var r=e.call(this,o)||this;r._defaults=t,r._selector=n,r._disposables=[],r._listener=Object.create(null);var i=function(e){if(e.getModeId()===n){var t,o=e.onDidChangeContent(function(){clearTimeout(t),t=setTimeout(function(){return r._doValidate(e.uri)},500)});r._listener[e.uri.toString()]={dispose:function(){o.dispose(),clearTimeout(t)}},r._doValidate(e.uri)}},a=function(e){monaco.editor.setModelMarkers(e,r._selector,[]);var t=e.uri.toString();r._listener[t]&&(r._listener[t].dispose(),delete r._listener[t])};return r._disposables.push(monaco.editor.onDidCreateModel(i)),r._disposables.push(monaco.editor.onWillDisposeModel(a)),r._disposables.push(monaco.editor.onDidChangeModelLanguage(function(e){a(e.model),i(e.model)})),r._disposables.push({dispose:function(){for(var e=0,t=monaco.editor.getModels();e<t.length;e++){var n=t[e];a(n)}}}),r._disposables.push(r._defaults.onDidChange(function(){for(var e=0,t=monaco.editor.getModels();e<t.length;e++){var n=t[e];a(n),i(n)}})),monaco.editor.getModels().forEach(i),r}return a(t,e),t.prototype.dispose=function(){this._disposables.forEach(function(e){return e&&e.dispose()}),this._disposables=[]},t.prototype._doValidate=function(e){var t=this;this._worker(e).then(function(n){if(!monaco.editor.getModel(e))return null;var o=[],r=t._defaults.getDiagnosticsOptions(),i=r.noSyntaxValidation,a=r.noSemanticValidation;return i||o.push(n.getSyntacticDiagnostics(e.toString())),a||o.push(n.getSemanticDiagnostics(e.toString())),u.join(o)}).then(function(n){if(!n||!monaco.editor.getModel(e))return null;var o=n.reduce(function(e,t){return t.concat(e)},[]).map(function(n){return t._convertDiagnostics(e,n)});monaco.editor.setModelMarkers(monaco.editor.getModel(e),t._selector,o)}).done(void 0,function(e){console.error(e)})},t.prototype._convertDiagnostics=function(e,t){var n=this._offsetToPosition(e,t.start),o=n.lineNumber,r=n.column,i=this._offsetToPosition(e,t.start+t.length),a=i.lineNumber,s=i.column;return{severity:monaco.MarkerSeverity.Error,startLineNumber:o,startColumn:r,endLineNumber:a,endColumn:s,message:function(e,t){if("string"==typeof e)return e;for(var n=e,o="",r=0;n;){if(r){o+=t;for(var i=0;i<r;i++)o+="  "}o+=n.messageText,r++,n=n.next}return o}(t.messageText,"\n")}},t}(l),m=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),Object.defineProperty(t.prototype,"triggerCharacters",{get:function(){return["."]},enumerable:!0,configurable:!0}),t.prototype.provideCompletionItems=function(e,n,o){e.getWordUntilPosition(n);var r=e.uri,i=this._positionToOffset(r,n);return C(o,this._worker(r).then(function(e){return e.getCompletionsAtPosition(r.toString(),i)}).then(function(e){if(e)return e.entries.map(function(e){return{uri:r,position:n,label:e.name,sortText:e.sortText,kind:t.convertKind(e.kind)}})}))},t.prototype.resolveCompletionItem=function(e,n){var o=this,r=e,i=r.uri,a=r.position;return C(n,this._worker(i).then(function(e){return e.getCompletionEntryDetails(i.toString(),o._positionToOffset(i,a),r.label)}).then(function(e){return e?{uri:i,position:a,label:e.name,kind:t.convertKind(e.kind),detail:c(e.displayParts),documentation:c(e.documentation)}:r}))},t.convertKind=function(e){switch(e){case y.primitiveType:case y.keyword:return monaco.languages.CompletionItemKind.Keyword;case y.variable:case y.localVariable:return monaco.languages.CompletionItemKind.Variable;case y.memberVariable:case y.memberGetAccessor:case y.memberSetAccessor:return monaco.languages.CompletionItemKind.Field;case y.function:case y.memberFunction:case y.constructSignature:case y.callSignature:case y.indexSignature:return monaco.languages.CompletionItemKind.Function;case y.enum:return monaco.languages.CompletionItemKind.Enum;case y.module:return monaco.languages.CompletionItemKind.Module;case y.class:return monaco.languages.CompletionItemKind.Class;case y.interface:return monaco.languages.CompletionItemKind.Interface;case y.warning:return monaco.languages.CompletionItemKind.File}return monaco.languages.CompletionItemKind.Property},t}(l),f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.signatureHelpTriggerCharacters=["(",","],t}return a(t,e),t.prototype.provideSignatureHelp=function(e,t,n){var o=this,r=e.uri;return C(n,this._worker(r).then(function(e){return e.getSignatureHelpItems(r.toString(),o._positionToOffset(r,t))}).then(function(e){if(e){var t={activeSignature:e.selectedItemIndex,activeParameter:e.argumentIndex,signatures:[]};return e.items.forEach(function(e){var n={label:"",documentation:null,parameters:[]};n.label+=c(e.prefixDisplayParts),e.parameters.forEach(function(t,o,r){var i=c(t.displayParts),a={label:i,documentation:c(t.documentation)};n.label+=i,n.parameters.push(a),o<r.length-1&&(n.label+=c(e.separatorDisplayParts))}),n.label+=c(e.suffixDisplayParts),t.signatures.push(n)}),t}}))},t}(l),g=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t.prototype.provideHover=function(e,t,n){var o=this,r=e.uri;return C(n,this._worker(r).then(function(e){return e.getQuickInfoAtPosition(r.toString(),o._positionToOffset(r,t))}).then(function(e){if(e){var t=c(e.documentation),n=e.tags?e.tags.map(function(e){var t="*@"+e.name+"*";return e.text?t+(e.text.match(/\r\n|\n/g)?" \n"+e.text:" - "+e.text):t}).join("  \n\n"):"",i=c(e.displayParts);return{range:o._textSpanToRange(r,e.textSpan),contents:[{value:"```js\n"+i+"\n```\n"},{value:t+(n?"\n\n"+n:"")}]}}}))},t}(l),d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t.prototype.provideDocumentHighlights=function(e,t,n){var o=this,r=e.uri;return C(n,this._worker(r).then(function(e){return e.getOccurrencesAtPosition(r.toString(),o._positionToOffset(r,t))}).then(function(e){if(e)return e.map(function(e){return{range:o._textSpanToRange(r,e.textSpan),kind:e.isWriteAccess?monaco.languages.DocumentHighlightKind.Write:monaco.languages.DocumentHighlightKind.Text}})}))},t}(l),h=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t.prototype.provideDefinition=function(e,t,n){var o=this,r=e.uri;return C(n,this._worker(r).then(function(e){return e.getDefinitionAtPosition(r.toString(),o._positionToOffset(r,t))}).then(function(e){if(e){for(var t=[],n=0,r=e;n<r.length;n++){var i=r[n],a=s.parse(i.fileName);monaco.editor.getModel(a)&&t.push({uri:a,range:o._textSpanToRange(a,i.textSpan)})}return t}}))},t}(l),v=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t.prototype.provideReferences=function(e,t,n,o){var r=this,i=e.uri;return C(o,this._worker(i).then(function(e){return e.getReferencesAtPosition(i.toString(),r._positionToOffset(i,t))}).then(function(e){if(e){for(var t=[],n=0,o=e;n<o.length;n++){var i=o[n],a=s.parse(i.fileName);monaco.editor.getModel(a)&&t.push({uri:a,range:r._textSpanToRange(a,i.textSpan)})}return t}}))},t}(l),_=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t.prototype.provideDocumentSymbols=function(e,t){var n=this,o=e.uri;return C(t,this._worker(o).then(function(e){return e.getNavigationBarItems(o.toString())}).then(function(e){if(e){var t=function(e,r,i){var a={name:r.text,detail:"",kind:b[r.kind]||monaco.languages.SymbolKind.Variable,range:n._textSpanToRange(o,r.spans[0]),selectionRange:n._textSpanToRange(o,r.spans[0]),containerName:i};if(r.childItems&&r.childItems.length>0)for(var s=0,u=r.childItems;s<u.length;s++){var c=u[s];t(e,c,a.name)}e.push(a)},r=[];return e.forEach(function(e){return t(r,e)}),r}}))},t}(l),y=function(){function e(){}return e.unknown="",e.keyword="keyword",e.script="script",e.module="module",e.class="class",e.interface="interface",e.type="type",e.enum="enum",e.variable="var",e.localVariable="local var",e.function="function",e.localFunction="local function",e.memberFunction="method",e.memberGetAccessor="getter",e.memberSetAccessor="setter",e.memberVariable="property",e.constructorImplementation="constructor",e.callSignature="call",e.indexSignature="index",e.constructSignature="construct",e.parameter="parameter",e.typeParameter="type parameter",e.primitiveType="primitive type",e.label="label",e.alias="alias",e.const="const",e.let="let",e.warning="warning",e}(),b=Object.create(null);b[y.module]=monaco.languages.SymbolKind.Module,b[y.class]=monaco.languages.SymbolKind.Class,b[y.enum]=monaco.languages.SymbolKind.Enum,b[y.interface]=monaco.languages.SymbolKind.Interface,b[y.memberFunction]=monaco.languages.SymbolKind.Method,b[y.memberVariable]=monaco.languages.SymbolKind.Property,b[y.memberGetAccessor]=monaco.languages.SymbolKind.Property,b[y.memberSetAccessor]=monaco.languages.SymbolKind.Property,b[y.variable]=monaco.languages.SymbolKind.Variable,b[y.const]=monaco.languages.SymbolKind.Variable,b[y.localVariable]=monaco.languages.SymbolKind.Variable,b[y.variable]=monaco.languages.SymbolKind.Variable,b[y.function]=monaco.languages.SymbolKind.Function,b[y.localFunction]=monaco.languages.SymbolKind.Function;var S,w,k=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t._convertOptions=function(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:i.Smart,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}},t.prototype._convertTextChanges=function(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}},t}(l),T=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),t.prototype.provideDocumentRangeFormattingEdits=function(e,t,n,o){var r=this,i=e.uri;return C(o,this._worker(i).then(function(e){return e.getFormattingEditsForRange(i.toString(),r._positionToOffset(i,{lineNumber:t.startLineNumber,column:t.startColumn}),r._positionToOffset(i,{lineNumber:t.endLineNumber,column:t.endColumn}),k._convertOptions(n))}).then(function(e){if(e)return e.map(function(e){return r._convertTextChanges(i,e)})}))},t}(k),I=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a(t,e),Object.defineProperty(t.prototype,"autoFormatTriggerCharacters",{get:function(){return[";","}","\n"]},enumerable:!0,configurable:!0}),t.prototype.provideOnTypeFormattingEdits=function(e,t,n,o,r){var i=this,a=e.uri;return C(r,this._worker(a).then(function(e){return e.getFormattingEditsAfterKeystroke(a.toString(),i._positionToOffset(a,t),n,k._convertOptions(o))}).then(function(e){if(e)return e.map(function(e){return i._convertTextChanges(a,e)})}))},t}(k);function C(e,t){return e.onCancellationRequested(function(){return t.cancel()}),t}function P(e){w=D(e,"typescript")}function x(e){S=D(e,"javascript")}function O(){return new monaco.Promise(function(e,t){if(!S)return t("JavaScript not registered!");e(S)})}function K(){return new monaco.Promise(function(e,t){if(!w)return t("TypeScript not registered!");e(w)})}function D(e,t){var n=new r(t,e),o=function(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];return n.getLanguageServiceWorker.apply(n,[e].concat(t))};return monaco.languages.registerCompletionItemProvider(t,new m(o)),monaco.languages.registerSignatureHelpProvider(t,new f(o)),monaco.languages.registerHoverProvider(t,new g(o)),monaco.languages.registerDocumentHighlightProvider(t,new d(o)),monaco.languages.registerDefinitionProvider(t,new h(o)),monaco.languages.registerReferenceProvider(t,new v(o)),monaco.languages.registerDocumentSymbolProvider(t,new _(o)),monaco.languages.registerDocumentRangeFormattingEditProvider(t,new T(o)),monaco.languages.registerOnTypeFormattingEditProvider(t,new I(o)),new p(e,t,o),o}n.d(t,"setupTypeScript",function(){return P}),n.d(t,"setupJavaScript",function(){return x}),n.d(t,"getJavaScriptWorker",function(){return O}),n.d(t,"getTypeScriptWorker",function(){return K})}}]);
//# sourceMappingURL=bundle.js.map