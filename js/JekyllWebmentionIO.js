!function(t){"use strict";t.location.origin||(t.location.origin=t.location.protocol+"//"+t.location.host),Object.keys||(Object.keys=function(t){if(t!==Object(t))throw new TypeError("Object.keys called on a non-object");var e,n=[];for(e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.push(e);return n})}(this,this.document),function(t,e,n){"use strict";function i(){for(var t,i,s,o,a,l=r.length;l--;)if("dataset"in(t=r[l])&&"webmentionTypes"in t.dataset){for(s=(i=t.dataset.webmentionTypes.split(",")).length,a=0;s--;)o=n.types[i[s]],a+=e.querySelectorAll(".webmention.webmention--"+o).length;t.innerText=a}else t.innerText=e.querySelectorAll(".webmention").length}if("querySelectorAll"in e){"JekyllWebmentionIO"in t||(t.JekyllWebmentionIO={});var r=e.querySelectorAll(".webmention-count"),s="JekyllWebmentionIO:update_counters";r.length&&(n.counter_update_event=new Event(s),e.addEventListener(s,i,!1))}}(this,this.document,this.JekyllWebmentionIO);var Liquid={author:"Matt McCray <darthapo@gmail.com>",version:"1.3.2",readTemplateFile:function(){throw"This liquid context does not allow includes."},registerFilters:function(t){Liquid.Template.registerFilter(t)},parse:function(t){return Liquid.Template.parse(t)},extensions:{}};Liquid.extensions.object={},Liquid.extensions.object.update=function(t){for(var e in t)this[e]=t[e];return this},Liquid.extensions.object.hasKey=function(t){return!!this[t]},Liquid.extensions.object.hasValue=function(t){for(var e in this)if(this[e]==t)return!0;return!1},Liquid.extensions.object.isEmpty=function(t){if(!t||""===Liquid.extensions.stringTools.strip(t.toString()))return!0;if(t.length&&t.length>0)return!1;if("number"==typeof t)return!1;for(var e in t)if(t[e])return!1;return!0},Liquid.extensions.stringTools={},Liquid.extensions.stringTools.capitalize=function(t){return t.charAt(0).toUpperCase()+t.substring(1).toLowerCase()},Liquid.extensions.stringTools.strip=function(t){return t.replace(/^\s+/,"").replace(/\s+$/,"")},Liquid.extensions.arrayTools={},Liquid.extensions.arrayTools.last=function(t){return t[t.length-1]},Liquid.extensions.arrayTools.indexOf=function(t,e){for(var n=0;n<t.length;n++)if(t[n]==e)return n;return-1},Liquid.extensions.arrayTools.map=function(t,e){var n=t.length;if("function"!=typeof e)throw"Liquid.extensions.arrayTools.map requires first argument to be a function";for(var i=new Array(n),r=arguments[2],s=0;s<n;s++)s in t&&(i[s]=e.call(r,t[s],s,t));return i},Liquid.extensions.arrayTools.flatten=function(t){for(var e=t.length,n=[],i=0;i<e;i++)t[i]instanceof Array?n=n.concat(t[i]):n.push(t[i]);return n},Liquid.extensions.arrayTools.each=function(t,e){var n=t.length;if("function"!=typeof e)throw"Liquid.extensions.arrayTools.each requires first argument to be a function";for(var i=arguments[2],r=0;r<n;r++)r in t&&e.call(i,t[r],r,t);return null},Liquid.extensions.arrayTools.include=function(t,e){t.length;return Liquid.extensions.arrayTools.indexOf(t,e)>=0},function(){var t=!1,e=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){},this.Class.extend=function(n){function i(){!t&&this.init&&this.init.apply(this,arguments)}var r=this.prototype;t=!0;var s=new this;for(var o in t=!1,n)s[o]="function"==typeof n[o]&&"function"==typeof r[o]&&e.test(n[o])?function(t,e){return function(){var n=this._super;this._super=r[t];var i=e.apply(this,arguments);return this._super=n,i}}(o,n[o]):n[o];return i.prototype=s,i.prototype.constructor=i,i.extend=arguments.callee,i}}.call(Liquid),Liquid.Tag=Liquid.Class.extend({init:function(t,e,n){this.tagName=t,this.markup=e,this.nodelist=this.nodelist||[],this.parse(n)},parse:function(){},render:function(){return""}}),Liquid.Block=Liquid.Tag.extend({init:function(t,e,n){this.blockName=t,this.blockDelimiter="end"+this.blockName,this._super(t,e,n)},parse:function(t){this.nodelist||(this.nodelist=[]),this.nodelist.length=0;var e=t.shift();for(t.push("");t.length;){if(/^\{\%/.test(e)){var n=e.match(/^\{\%\s*(\w+)\s*(.*)?\%\}$/);if(!n)throw"Tag '"+e+"' was not properly terminated with: %}";if(this.blockDelimiter==n[1])return void this.endTag();n[1]in Liquid.Template.tags?this.nodelist.push(new Liquid.Template.tags[n[1]](n[1],n[2],t)):this.unknownTag(n[1],n[2],t)}else/^\{\{/.test(e)?this.nodelist.push(this.createVariable(e)):this.nodelist.push(e);e=t.shift()}this.assertMissingDelimitation()},endTag:function(){},unknownTag:function(t){switch(t){case"else":throw this.blockName+" tag does not expect else tag";case"end":throw"'end' is not a valid delimiter for "+this.blockName+" tags. use "+this.blockDelimiter;default:throw"Unknown tag: "+t}},createVariable:function(t){var e=t.match(/^\{\{(.*)\}\}$/);if(e)return new Liquid.Variable(e[1]);throw"Variable '"+t+"' was not properly terminated with: }}"},render:function(t){return this.renderAll(this.nodelist,t)},renderAll:function(t,e){return Liquid.extensions.arrayTools.map(t||[],function(t){var n="";try{n=t.render?t.render(e):t}catch(i){n=e.handleError(i)}return n})},assertMissingDelimitation:function(){throw this.blockName+" tag was never closed"}}),Liquid.Document=Liquid.Block.extend({init:function(t){this.blockDelimiter=[],this.parse(t)},assertMissingDelimitation:function(){}}),Liquid.Strainer=Liquid.Class.extend({init:function(t){this.context=t},respondTo:function(t){return!(t=t.toString()).match(/^__/)&&(!Liquid.extensions.arrayTools.include(Liquid.Strainer.requiredMethods,t)&&t in this)}}),Liquid.Strainer.filters={},Liquid.Strainer.globalFilter=function(t){for(var e in t)Liquid.Strainer.filters[e]=t[e]},Liquid.Strainer.requiredMethods=["respondTo","context"],Liquid.Strainer.create=function(t){var e=new Liquid.Strainer(t);for(var n in Liquid.Strainer.filters)e[n]=Liquid.Strainer.filters[n];return e},Liquid.Context=Liquid.Class.extend({init:function(t,e,n){this.scopes=[t||{}],this.registers=e||{},this.errors=[],this.rethrowErrors=n,this.strainer=Liquid.Strainer.create(this)},get:function(t){return this.resolve(t)},set:function(t,e){this.scopes[0][t]=e},hasKey:function(t){return!!this.resolve(t)},push:function(){var t={};return this.scopes.unshift(t),t},merge:function(t){return Liquid.extensions.object.update.call(this.scopes[0],t)},pop:function(){if(1==this.scopes.length)throw"Context stack error";return this.scopes.shift()},stack:function(t,e){var n=null;this.push();try{n=t.apply(e||this.strainer)}finally{this.pop()}return n},invoke:function(t,e){return this.strainer.respondTo(t)?this.strainer[t].apply(this.strainer,e):0==e.length?null:e[0]},resolve:function(t){switch(t){case null:case"nil":case"null":case"":return null;case"true":return!0;case"false":return!1;case"blank":case"empty":return"";default:if(/^'(.*)'$/.test(t))return t.replace(/^'(.*)'$/,"$1");if(/^"(.*)"$/.test(t))return t.replace(/^"(.*)"$/,"$1");if(/^(\d+)$/.test(t))return parseInt(t.replace(/^(\d+)$/,"$1"));if(/^(\d[\d\.]+)$/.test(t))return parseFloat(t.replace(/^(\d[\d\.]+)$/,"$1"));if(/^\((\S+)\.\.(\S+)\)$/.test(t)){var e=t.match(/^\((\S+)\.\.(\S+)\)$/),n=parseInt(e[1]),i=parseInt(e[2]),r=[];if(isNaN(n)){let i=this.resolve(e[1]);if(n=parseInt(i),isNaN(n))throw new Error("Incorrect param for range: "+t)}if(isNaN(i)){let n=this.resolve(e[2]);if(i=parseInt(n),isNaN(i))throw new Error("Incorrect param for range: "+t)}for(var s=i-n+1,o=0;o<s;o++)r.push(o+n);return r}return this.variable(t)}},findVariable:function(t){for(var e=0;e<this.scopes.length;e++){var n=this.scopes[e];if(n&&"undefined"!=typeof n[t]){var i=n[t];return"function"==typeof i&&(i=i.apply(this),n[t]=i),i&&this._isObject(i)&&"toLiquid"in i&&(i=i.toLiquid()),i&&this._isObject(i)&&"setContext"in i&&i.setContext(self),i}}return null},variable:function(t){if("string"!=typeof t)return null;var e=t.match(/\[[^\]]+\]|(?:[\w\-]\??)+/g),n=e.shift(),i=n.match(/^\[(.*)\]$/);i&&(n=this.resolve(i[1]));var r=this.findVariable(n),s=this;return r&&Liquid.extensions.arrayTools.each(e,function(t){var e=t.match(/^\[(.*)\]$/);if(e){t=s.resolve(e[1]);"function"==typeof r[t]&&(r[t]=r[t].apply(this)),r=r[t],s._isObject(r)&&"toLiquid"in r&&(r=r.toLiquid())}else{if((s._isObject(r)||"hash"==typeof r)&&t in r){var n=r[t];"function"==typeof n&&(n=r[t]=n.apply(s)),r=s._isObject(n)&&"toLiquid"in n?n.toLiquid():n}else if(/^\d+$/.test(t)){var i=parseInt(t);"function"==typeof r[i]&&(r[i]=r[i].apply(s)),r=s._isObject(r)&&s._isObject(r[i])&&"toLiquid"in r[i]?r[i].toLiquid():r[i]}else{if(!r||"function"!=typeof r[t]||!Liquid.extensions.arrayTools.include(["length","size","first","last"],t))return r=null;"toLiquid"in(r=r[t].apply(t))&&(r=r.toLiquid())}s._isObject(r)&&"setContext"in r&&r.setContext(s)}}),r},addFilters:function(t){t=Liquid.extensions.arrayTools.flatten(t),Liquid.extensions.arrayTools.each(t,function(t){if(!this._isObject(t))throw"Expected object but got: "+typeof t;this.strainer.addMethods(t)})},handleError:function(t){if(this.errors.push(t),this.rethrowErrors)throw t;return"Liquid error: "+(t.message?t.message:t.description?t.description:t)},_isObject:function(t){return null!=t&&"object"==typeof t}}),Liquid.Template=Liquid.Class.extend({init:function(){this.root=null,this.registers={},this.assigns={},this.errors=[],this.rethrowErrors=!1},parse:function(t){return this.root=new Liquid.Document(Liquid.Template.tokenize(t)),this},render:function(){if(!this.root)return"";var t={ctx:arguments[0],filters:arguments[1],registers:arguments[2]},e=null;t.ctx instanceof Liquid.Context?(e=t.ctx,this.assigns=e.assigns,this.registers=e.registers):(t.ctx&&Liquid.extensions.object.update.call(this.assigns,t.ctx),t.registers&&Liquid.extensions.object.update.call(this.registers,t.registers),e=new Liquid.Context(this.assigns,this.registers,this.rethrowErrors)),t.filters&&e.addFilters(arg.filters);try{return this.root.render(e).join("")}finally{this.errors=e.errors}},renderWithErrors:function(){var t=this.rethrowErrors;this.rethrowErrors=!0;var e=this.render.apply(this,arguments);return this.rethrowErrors=t,e}}),Liquid.Template.tags={},Liquid.Template.registerTag=function(t,e){Liquid.Template.tags[t]=e},Liquid.Template.registerFilter=function(t){Liquid.Strainer.globalFilter(t)},Liquid.Template.tokenize=function(t){var e=t.split(/(\{\%.*?\%\}|\{\{.*?\}\}?)/);return""==e[0]&&e.shift(),e},Liquid.Template.parse=function(t){return(new Liquid.Template).parse(t)},Liquid.Variable=Liquid.Class.extend({init:function(t){this.markup=t,this.name=null,this.filters=[];var e=this,n=t.match(/\s*("[^"]+"|'[^']+'|[^\s,|]+)/);if(n){this.name=n[1];var i=t.match(/\|\s*(.*)/);if(i){var r=i[1].split(/\|/);Liquid.extensions.arrayTools.each(r,function(t){var n=t.match(/\s*(\w+)/);if(n){var i=n[1],r=[];Liquid.extensions.arrayTools.each(Liquid.extensions.arrayTools.flatten(t.match(/(?:[:|,]\s*)("[^"]+"|'[^']+'|[^\s,|]+)/g)||[]),function(t){var e=t.match(/^[\s|:|,]*(.*?)[\s]*$/);e&&r.push(e[1])}),e.filters.push([i,r])}})}}},render:function(t){if(null==this.name)return"";var e=t.get(this.name);return Liquid.extensions.arrayTools.each(this.filters,function(n){var i=n[0],r=Liquid.extensions.arrayTools.map(n[1]||[],function(e){return t.get(e)});r.unshift(e),e=t.invoke(i,r)}),e}}),Liquid.Condition=Liquid.Class.extend({init:function(t,e,n){this.left=t,this.operator=e,this.right=n,this.childRelation=null,this.childCondition=null,this.attachment=null},evaluate:function(t){t=t||new Liquid.Context;var e=this.interpretCondition(this.left,this.right,this.operator,t);switch(this.childRelation){case"or":return e||this.childCondition.evaluate(t);case"and":return e&&this.childCondition.evaluate(t);default:return e}},or:function(t){this.childRelation="or",this.childCondition=t},and:function(t){this.childRelation="and",this.childCondition=t},attach:function(t){return this.attachment=t,this.attachment},isElse:!1,interpretCondition:function(t,e,n,i){if(!n)return i.get(t);if(t=i.get(t),e=i.get(e),!(n=Liquid.Condition.operators[n]))throw"Unknown operator "+n;return n(t,e)},toString:function(){return"<Condition "+this.left+" "+this.operator+" "+this.right+">"}}),Liquid.Condition.operators={"==":function(t,e){return t==e},"=":function(t,e){return t==e},"!=":function(t,e){return t!=e},"<>":function(t,e){return t!=e},"<":function(t,e){return t<e},">":function(t,e){return t>e},"<=":function(t,e){return t<=e},">=":function(t,e){return t>=e},contains:function(t,e){return"[object Array]"===Object.prototype.toString.call(t)?Liquid.extensions.arrayTools.indexOf(t,e)>=0:t.match(e)},hasKey:function(t,e){return Liquid.extensions.object.hasKey.call(t,e)},hasValue:function(t,e){return Liquid.extensions.object.hasValue.call(t,e)}},Liquid.ElseCondition=Liquid.Condition.extend({isElse:!0,evaluate:function(){return!0},toString:function(){return"<ElseCondition>"}}),Liquid.Drop=Liquid.Class.extend({setContext:function(t){this.context=t},beforeMethod:function(){},invokeDrop:function(t){var e=this.beforeMethod();return!e&&t in this&&(e=this[t].apply(this)),e},hasKey:function(){return!0}});var split,hackObjectEach=function(t){if("function"!=typeof t)throw"Object.each requires first argument to be a function";var e=0,n=arguments[1];for(var i in this){var r=this[i],s=[i,r];s.key=i,s.value=r,t.call(n,s,e,this),e++}return null};Liquid.Template.registerTag("assign",Liquid.Tag.extend({tagSyntax:/((?:\(?[\w\-\.\[\]]\)?)+)\s*=\s*(.+)/,init:function(t,e,n){var i=e.match(this.tagSyntax);if(!i)throw"Syntax error in 'assign' - Valid syntax: assign [var] = [source]";this.to=i[1],this.from=i[2],this._super(t,e,n)},render:function(t){var e=new Liquid.Variable(this.from);return Liquid.extensions.arrayTools.last(t.scopes)[this.to.toString()]=e.render(t),""}})),Liquid.Template.registerTag("cache",Liquid.Block.extend({tagSyntax:/(\w+)/,init:function(t,e,n){var i=e.match(this.tagSyntax);if(!i)throw"Syntax error in 'cache' - Valid syntax: cache [var]";this.to=i[1],this._super(t,e,n)},render:function(t){var e=this._super(t);return Liquid.extensions.arrayTools.last(t.scopes)[this.to]=Liquid.extensions.arrayTools.flatten([e]).join(""),""}})),Liquid.Template.registerTag("capture",Liquid.Block.extend({tagSyntax:/(\w+)/,init:function(t,e,n){var i=e.match(this.tagSyntax);if(!i)throw"Syntax error in 'capture' - Valid syntax: capture [var]";this.to=i[1],this._super(t,e,n)},render:function(t){var e=this._super(t);return Liquid.extensions.arrayTools.last(t.scopes)[this.to.toString()]=Liquid.extensions.arrayTools.flatten([e]).join(""),""}})),Liquid.Template.registerTag("case",Liquid.Block.extend({tagSyntax:/("[^"]+"|'[^']+'|[^\s,|]+)/,tagWhenSyntax:/("[^"]+"|'[^']+'|[^\s,|]+)(?:(?:\s+or\s+|\s*\,\s*)("[^"]+"|'[^']+'|[^\s,|]+.*))?/,init:function(t,e,n){this.blocks=[],this.nodelist=[];var i=e.match(this.tagSyntax);if(!i)throw"Syntax error in 'case' - Valid syntax: case [condition]";this.left=i[1],this._super(t,e,n)},unknownTag:function(t,e,n){switch(t){case"when":this.recordWhenCondition(e);break;case"else":this.recordElseCondition(e);break;default:this._super(t,e,n)}},render:function(t){var e=this,n=[],i=!0;return t.stack(function(){for(var r=0;r<e.blocks.length;r++){var s=e.blocks[r];if(s.isElse)return 1==i&&(n=Liquid.extensions.arrayTools.flatten([n,e.renderAll(s.attachment,t)])),n;s.evaluate(t)&&(i=!1,n=Liquid.extensions.arrayTools.flatten([n,e.renderAll(s.attachment,t)]))}}),n},recordWhenCondition:function(t){for(;t;){var e=t.match(this.tagWhenSyntax);if(!e)throw"Syntax error in tag 'case' - Valid when condition: {% when [condition] [or condition2...] %} ";t=e[2];var n=new Liquid.Condition(this.left,"==",e[1]);this.blocks.push(n),this.nodelist=n.attach([])}},recordElseCondition:function(t){if(""!=Liquid.extensions.stringTools.strip(t||""))throw"Syntax error in tag 'case' - Valid else condition: {% else %} (no parameters) ";var e=new Liquid.ElseCondition;this.blocks.push(e),this.nodelist=e.attach([])}})),Liquid.Template.registerTag("comment",Liquid.Block.extend({render:function(){return""}})),Liquid.Template.registerTag("cycle",Liquid.Tag.extend({tagSimpleSyntax:/"[^"]+"|'[^']+'|[^\s,|]+/,tagNamedSyntax:/("[^"]+"|'[^']+'|[^\s,|]+)\s*\:\s*(.*)/,init:function(t,e,n){var i;if(i=e.match(this.tagNamedSyntax))this.variables=this.variablesFromString(i[2]),this.name=i[1];else{if(!(i=e.match(this.tagSimpleSyntax)))throw"Syntax error in 'cycle' - Valid syntax: cycle [name :] var [, var2, var3 ...]";this.variables=this.variablesFromString(e),this.name="'"+this.variables.toString()+"'"}this._super(t,e,n)},render:function(t){var e=this,n=t.get(e.name),i="";return t.registers.cycle||(t.registers.cycle={}),t.registers.cycle[n]||(t.registers.cycle[n]=0),t.stack(function(){var r=t.registers.cycle[n],s=t.get(e.variables[r]);(r+=1)==e.variables.length&&(r=0),t.registers.cycle[n]=r,i=s}),i},variablesFromString:function(t){return Liquid.extensions.arrayTools.map(t.split(","),function(t){var e=t.match(/\s*("[^"]+"|'[^']+'|[^\s,|]+)\s*/);return e[1]?e[1]:null})}})),Liquid.Template.registerTag("for",Liquid.Block.extend({tagSyntax:/(\w+)\s+in\s+((?:\(?[\w\-\.\[\]]\)?)+)/,init:function(t,e,n){var i=e.match(this.tagSyntax);if(!i)throw"Syntax error in 'for loop' - Valid syntax: for [item] in [collection]";this.variableName=i[1],this.collectionName=i[2],this.name=this.variableName+"-"+this.collectionName,this.attributes={};e.replace(this.tagSyntax,"");var r=e.match(/(\w*?)\s*\:\s*("[^"]+"|'[^']+'|[^\s,|]+)/g);r&&Liquid.extensions.arrayTools.each(r,function(t){t=t.split(":"),this.attributes[Liquid.extensions.stringTools.strip(t[0])]=Liquid.extensions.stringTools.strip(t[1])},this),this._super(t,e,n)},render:function(t){var e=this,n=[],i=t.get(this.collectionName)||[],r=[0,i.length];if(t.registers["for"]||(t.registers["for"]={}),this.attributes.limit||this.attributes.offset){var s=0,o=0,a=0,l=null;r=[s="continue"==this.attributes.offset?t.registers["for"][this.name]:t.get(this.attributes.offset)||0,(a=(o=t.get(this.attributes.limit))?s+o+1:i.length)-1],t.registers["for"][this.name]=a}return(l=i.slice(r[0],r[1]))&&0!=l.length?(t.stack(function(){var i=l.length;Liquid.extensions.arrayTools.each(l,function(r,s){t.set(e.variableName,r),t.set("forloop",{name:e.name,length:i,index:s+1,index0:s,rindex:i-s,rindex0:i-s-1,first:0==s,last:s==i-1}),n.push((e.renderAll(e.nodelist,t)||[]).join(""))})}),Liquid.extensions.arrayTools.flatten([n]).join("")):""}})),Liquid.Template.registerTag("if",Liquid.Block.extend({tagSyntax:/("[^"]+"|'[^']+'|[^\s,|]+)\s*([=!<>a-z_]+)?\s*("[^"]+"|'[^']+'|[^\s,|]+)?/,init:function(t,e,n){this.nodelist=[],this.blocks=[],this.pushBlock("if",e),this._super(t,e,n)},unknownTag:function(t,e,n){Liquid.extensions.arrayTools.include(["elsif","else"],t)?this.pushBlock(t,e):this._super(t,e,n)},render:function(t){var e=this,n="";return t.stack(function(){for(var i=0;i<e.blocks.length;i++){var r=e.blocks[i];if(r.evaluate(t))return void(n=e.renderAll(r.attachment,t))}}),Liquid.extensions.arrayTools.flatten([n]).join("")},pushBlock:function(t,e){var n;if("else"==t)n=new Liquid.ElseCondition;else{var i=e.split(/\b(and|or)\b/).reverse();if(!(s=i.shift().match(this.tagSyntax)))throw"Syntax Error in tag '"+t+"' - Valid syntax: "+t+" [expression]";for(var r=new Liquid.Condition(s[1],s[2],s[3]);i.length>0;){var s,o=i.shift();if(!(s=i.shift().match(this.tagSyntax)))throw"Syntax Error in tag '"+t+"' - Valid syntax: "+t+" [expression]";var a=new Liquid.Condition(s[1],s[2],s[3]);a[o](r),r=a}n=r}n.attach([]),this.blocks.push(n),this.nodelist=n.attachment}})),Liquid.Template.registerTag("ifchanged",Liquid.Block.extend({render:function(t){var e=this,n="";return t.stack(function(){var i=e.renderAll(e.nodelist,t).join("");i!=t.registers.ifchanged&&(n=i,t.registers.ifchanged=n)}),n}})),Liquid.Template.registerTag("include",Liquid.Tag.extend({tagSyntax:/((?:"[^"]+"|'[^']+'|[^\s,|]+)+)(\s+(?:with|for)\s+((?:"[^"]+"|'[^']+'|[^\s,|]+)+))?/,init:function(t,e,n){var i=(e||"").match(this.tagSyntax);if(!i)throw"Error in tag 'include' - Valid syntax: include '[template]' (with|for) [object|collection]";this.templateName=i[1],this.templateNameVar=this.templateName.substring(1,this.templateName.length-1),this.variableName=i[3],this.attributes={};var r=e.match(/(\w*?)\s*\:\s*("[^"]+"|'[^']+'|[^\s,|]+)/g);r&&Liquid.extensions.arrayTools.each(r,function(t){t=t.split(":"),this.attributes[Liquid.extensions.stringTools.strip(t[0])]=Liquid.extensions.stringTools.strip(t[1])},this),this._super(t,e,n)},render:function(t){var e=this,n=Liquid.readTemplateFile(t.get(this.templateName)),i=Liquid.parse(n),r=t.get(this.variableName||this.templateNameVar),s="";return t.stack(function(){e.attributes.each=hackObjectEach,e.attributes.each(function(e){t.set(e.key,t.get(e.value))}),r instanceof Array?s=Liquid.extensions.arrayTools.map(r,function(n){return t.set(e.templateNameVar,n),i.render(t)}):(t.set(e.templateNameVar,r),s=i.render(t))}),s=Liquid.extensions.arrayTools.flatten([s]).join("")}})),Liquid.Template.registerTag("unless",Liquid.Template.tags["if"].extend({render:function(t){var e=this,n="";return t.stack(function(){if((r=e.blocks[0]).evaluate(t))for(var i=1;i<e.blocks.length;i++){var r;if((r=e.blocks[i]).evaluate(t))return void(n=e.renderAll(r.attachment,t))}else n=e.renderAll(r.attachment,t)}),Liquid.extensions.arrayTools.flatten([n]).join("")}})),Liquid.Template.registerTag("raw",Liquid.Block.extend({parse:function(t){this.nodelist||(this.nodelist=[]),this.nodelist.length=0;var e=t.shift();for(t.push("");t.length;){if(/^\{\%/.test(e)){var n=e.match(/^\{\%\s*(\w+)\s*(.*)?\%\}$/);if(n&&this.blockDelimiter==n[1])return void this.endTag()}this.nodelist.push(e||""),e=t.shift()}this.assertMissingDelimitation()},render:function(){return this.nodelist.join("")}})),Liquid.Template.registerTag("increment",Liquid.Tag.extend({tagSyntax:/((?:\(?[\w\-\.\[\]]\)?)+)/,init:function(t,e,n){var i=e.match(this.tagSyntax);if(console.log(t,e,n),console.log(i[1]),!i)throw"Syntax error in 'assign' - Valid syntax: increment [var]";this.name=i[1],this._super(t,e,n)},render:function(t){var e=this.name,n="";return t.registers.increment||(t.registers.increment={}),t.registers.increment[e]||(t.registers.increment[e]=0),n=String(t.registers.increment[e]),t.registers.increment[e]++,n}})),Liquid.Template.registerTag("decrement",Liquid.Tag.extend({tagSyntax:/((?:\(?[\w\-\.\[\]]\)?)+)/,init:function(t,e,n){var i=e.match(this.tagSyntax);if(console.log(t,e,n),console.log(i[1]),!i)throw"Syntax error in 'assign' - Valid syntax: decrement [var]";this.name=i[1],this._super(t,e,n)},render:function(t){var e=this.name,n="";return t.registers.decrement||(t.registers.decrement={}),t.registers.decrement[e]||(t.registers.decrement[e]=-1),n=String(t.registers.decrement[e]),t.registers.decrement[e]--,n}})),Liquid.Template.registerFilter({_HTML_ESCAPE_MAP:{"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#39;"},size:function(t){return t.length?t.length:0},downcase:function(t){return t.toString().toLowerCase()},upcase:function(t){return t.toString().toUpperCase()},capitalize:function(t){return Liquid.extensions.stringTools.capitalize(t.toString())},escape:function(t){var e=this;return t.replace(/[&<>"']/g,function(t){return e._HTML_ESCAPE_MAP[t]})},h:function(t){var e=this;return t.replace(/[&<>"']/g,function(t){return e._HTML_ESCAPE_MAP[t]})},"default":function(t,e){return Liquid.extensions.object.isEmpty(t)?e:t},truncate:function(t,e,n){if(!t||""==t)return"";e=e||50,n=n||"...";t.slice(0,e);return t.length>e?t.slice(0,e)+n:t},truncatewords:function(t,e,n){if(!t||""==t)return"";e=parseInt(e||15),n=n||"...";var i=t.toString().split(" "),r=Math.max(e,0);return i.length>r?i.slice(0,r).join(" ")+n:t},truncate_words:function(t,e,n){if(!t||""==t)return"";e=parseInt(e||15),n=n||"...";var i=t.toString().split(" "),r=Math.max(e,0);return i.length>r?i.slice(0,r).join(" ")+n:t},strip_html:function(t){return t.toString().replace(/<.*?>/g,"")},strip_newlines:function(t){return t.toString().replace(/\n/g,"")},join:function(t,e){return e=e||" ",t.join(e)},split:function(t,e){return e=e||" ",t.split(e)},sort:function(t){return t.sort()},reverse:function(t){return t.reverse()},replace:function(t,e,n){return n=n||"",t.toString().replace(new RegExp(e,"g"),n)},replace_first:function(t,e,n){return n=n||"",t.toString().replace(new RegExp(e,""),n)},newline_to_br:function(t){return t.toString().replace(/\n/g,"<br/>\n")},date:function(t,e){var n;return t instanceof Date&&(n=t),n instanceof Date||"now"!=t||(n=new Date),n instanceof Date||"number"!=typeof t||(n=new Date(1e3*t)),n instanceof Date||"string"!=typeof t||(n=new Date(Date.parse(t))),n instanceof Date?n.strftime(e):t},first:function(t){return t[0]},last:function(t){return(t=t)[t.length-1]},minus:function(t,e){return(Number(t)||0)-(Number(e)||0)},plus:function(t,e){return(Number(t)||0)+(Number(e)||0)},times:function(t,e){return(Number(t)||0)*(Number(e)||0)},divided_by:function(t,e){return(Number(t)||0)/(Number(e)||0)},modulo:function(t,e){return(Number(t)||0)%(Number(e)||0)},map:function(t,e){t=t||[];for(var n=[],i=0;i<t.length;i++)n.push(t[i][e]);return n},escape_once:function(t){var e=this;return t.replace(/["><']|&(?!([a-zA-Z]+|(#\d+));)/g,function(t){return e._HTML_ESCAPE_MAP[t]})},remove:function(t,e){return t.toString().replace(new RegExp(e,"g"),"")},remove_first:function(t,e){return t.toString().replace(e,"")},prepend:function(t,e){return""+(e||"").toString()+(t||"").toString()},append:function(t,e){return""+(t||"").toString()+(e||"").toString()}}),(new Date).strftime||(Date.ext={},Date.ext.util={},Date.ext.util.xPad=function(t,e,n){for(void 0===n&&(n=10);parseInt(t,10)<n&&n>1;n/=10)t=e.toString()+t;return t.toString()},Date.prototype.locale="en-GB",document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang&&(Date.prototype.locale=document.getElementsByTagName("html")[0].lang),Date.ext.locales={},Date.ext.locales.en={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],x:"%d/%m/%y",X:"%T"},"undefined"!=typeof JSON?Date.ext.locales["en-US"]=JSON.parse(JSON.stringify(Date.ext.locales.en)):Date.ext.locales["en-US"]=Date.ext.locales.en,Date.ext.locales["en-US"].c="%a %d %b %Y %r %Z",Date.ext.locales["en-US"].x="%D",Date.ext.locales["en-US"].X="%r",Date.ext.locales["en-GB"]=Date.ext.locales.en,Date.ext.locales["en-AU"]=Date.ext.locales["en-GB"],Date.ext.formats={a:function(t){return Date.ext.locales[t.locale].a[t.getDay()]},A:function(t){return Date.ext.locales[t.locale].A[t.getDay()]},b:function(t){return Date.ext.locales[t.locale].b[t.getMonth()]},B:function(t){return Date.ext.locales[t.locale].B[t.getMonth()]},c:"toLocaleString",C:function(t){return Date.ext.util.xPad(parseInt(t.getFullYear()/100,10),0)},d:["getDate","0"],e:["getDate"," "],g:function(t){return Date.ext.util.xPad(parseInt(Date.ext.util.G(t)/100,10),0)},G:function(t){var e=t.getFullYear(),n=parseInt(Date.ext.formats.V(t),10),i=parseInt(Date.ext.formats.W(t),10);return i>n?e++:0===i&&n>=52&&e--,e},H:["getHours","0"],I:function(t){var e=t.getHours()%12;return Date.ext.util.xPad(0===e?12:e,0)},j:function(t){var e=t-new Date(t.getFullYear()+"/1/1 GMT");e+=6e4*t.getTimezoneOffset();var n=parseInt(e/6e4/60/24,10)+1;return Date.ext.util.xPad(n,0,100)},m:function(t){return Date.ext.util.xPad(t.getMonth()+1,0)},M:["getMinutes","0"],p:function(t){return Date.ext.locales[t.locale].p[t.getHours()>=12?1:0]},P:function(t){return Date.ext.locales[t.locale].P[t.getHours()>=12?1:0]},S:["getSeconds","0"],u:function(t){var e=t.getDay();return 0===e?7:e},U:function(t){var e=parseInt(Date.ext.formats.j(t),10),n=6-t.getDay(),i=parseInt((e+n)/7,10);return Date.ext.util.xPad(i,0)},V:function(t){var e=parseInt(Date.ext.formats.W(t),10),n=new Date(t.getFullYear()+"/1/1").getDay(),i=e+(n>4||n<=1?0:1);return 53==i&&new Date(t.getFullYear()+"/12/31").getDay()<4?i=1:0===i&&(i=Date.ext.formats.V(new Date(t.getFullYear()-1+"/12/31"))),Date.ext.util.xPad(i,0)},w:"getDay",W:function(t){var e=parseInt(Date.ext.formats.j(t),10),n=7-Date.ext.formats.u(t),i=parseInt((e+n)/7,10);return Date.ext.util.xPad(i,0,10)},y:function(t){return Date.ext.util.xPad(t.getFullYear()%100,0)},Y:"getFullYear",z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+Date.ext.util.xPad(parseInt(Math.abs(e/60),10),0)+Date.ext.util.xPad(e%60,0)},Z:function(t){return t.toString().replace(/^.*\(([^)]+)\)$/,"$1")},"%":function(){return"%"}},Date.ext.aggregates={c:"locale",D:"%m/%d/%y",h:"%b",n:"\n",r:"%I:%M:%S %p",R:"%H:%M",t:"\t",T:"%H:%M:%S",x:"locale",X:"locale"},Date.ext.aggregates.z=Date.ext.formats.z(new Date),Date.ext.aggregates.Z=Date.ext.formats.Z(new Date),Date.ext.unsupported={},Date.prototype.strftime=function(t){this.locale in Date.ext.locales||(this.locale.replace(/-[a-zA-Z]+$/,"")in Date.ext.locales?this.locale=this.locale.replace(/-[a-zA-Z]+$/,""):this.locale="en-GB");for(var e=this;t.match(/%[cDhnrRtTxXzZ]/);)t=t.replace(/%([cDhnrRtTxXzZ])/g,function(t,n){var i=Date.ext.aggregates[n];return"locale"==i?Date.ext.locales[e.locale][n]:i});var n=t.replace(/%([aAbBCdegGHIjmMpPSuUVwWyY%])/g,function(t,n){var i=Date.ext.formats[n];return"string"==typeof i?e[i]():"function"==typeof i?i.call(e,e):"object"==typeof i&&"string"==typeof i[0]?Date.ext.util.xPad(e[i[0]](),i[1]):n});return e=null,n}),split=split||function(t){var e,n=String.prototype.split,i=/()??/.exec("")[1]===t;return e=function(e,r,s){if("[object RegExp]"!==Object.prototype.toString.call(r))return n.call(e,r,s);var o,a,l,u,c=[],h=(r.ignoreCase?"i":"")+(r.multiline?"m":"")+(r.extended?"x":"")+(r.sticky?"y":""),d=0;r=new RegExp(r.source,h+"g");for(e+="",i||(o=new RegExp("^"+r.source+"$(?!\\s)",h)),s=s===t?-1>>>0:s>>>0;(a=r.exec(e))&&!((l=a.index+a[0].length)>d&&(c.push(e.slice(d,a.index)),!i&&a.length>1&&a[0].replace(o,function(){for(var e=1;e<arguments.length-2;e++)arguments[e]===t&&(a[e]=t)}),a.length>1&&a.index<e.length&&Array.prototype.push.apply(c,a.slice(1)),u=a[0].length,d=l,c.length>=s));)r.lastIndex===a.index&&r.lastIndex++;return d===e.length?!u&&r.test("")||c.push(""):c.push(e.slice(d)),c.length>s?c.slice(0,s):c},String.prototype.split=function(t,n){return e(this,t,n)},e}(),"undefined"!=typeof exports&&("undefined"!=typeof module&&module.exports&&(exports=module.exports=Liquid),exports.Liquid=Liquid),function(t,e){if("querySelectorAll"in e){"JekyllWebmentionIO"in t||(t.JekyllWebmentionIO={});var n,i=[],r=e.querySelector('meta[property="webmention:redirected_from"]'),s=t.location.origin;i.push(s+t.location.pathname),r&&(r.getAttribute("content").split(",").forEach(function(t){i.push(t.indexOf("//")<0?s+t:t)}),!1),(n=e.createElement("script")).async=!0,n.src="https://webmention.io/api/mentions?jsonp=window.JekyllWebmentionIO.processWebmentions&target[]="+i.join("&target[]="),e.querySelector("head").appendChild(n)}}(this,this.document),function(t,e){function n(){for(var t,n=e.querySelectorAll("template[id^=webmention-]"),i=n.length;i--;)(t=n[i]).content.querySelector("ol")?f[t.id]=t.content.querySelector("ol"):f[t.id]=t.content;t=null}function i(){for(var t=e.querySelectorAll("[id^=webmention-]"),n=t.length;n--;)JekyllWebmentionIO.existing_webmentions.push(t[n].getAttribute("id").replace("webmention-",""));t=null}function r(){for(var t,n,i,r,s=e.querySelectorAll(".webmentions"),o=s.length;o--;){n="webmentions",(t=s[o]).className.indexOf("webmentions--")>-1&&(n=t.className.match(/webmentions\-\-(.*)/)[1]),t.type=n,f["webmention-"+n]&&(t.template=f["webmention-"+n]),r=(i="dataset"in t&&"webmentionTypes"in t.dataset?t.dataset.webmentionTypes.split(","):[n]).length;for(;r--;)(n=i[r])in d||(d[n]=[]),d[n].push(t)}t=null}function s(t){var e,n,i,r,s=0,a={},l=Object.keys(d),u=function(t){return JekyllWebmentionIO.types[t]===this.type};for(s=l.length;s--;)a[l[s]]=[];for(s=t.length;s--;)n=t[s],r=u.bind(n),i=Object.keys(JekyllWebmentionIO.types).filter(r)[0],l.indexOf(i)>-1&&a[i].push(n),a.webmentions&&a.webmentions.push(n);for(s=l.length;s--;)for(e=d[l[s]].length;e--;)a[l[s]].length>0&&o(a[l[s]],d[l[s]][e])}function o(e,n){if(e.length<1)console.warn("No webmentions to add, check your application code");else if(n.template)if("Liquid"in t){var i,r=n.querySelector(".webmentions__list"),s=n.template,o="append";r?s=Liquid.parse(s.innerHTML):(s=Liquid.parse(s.outerHTML),o="replace"),i=s.render({webmentions:e}),"append"==o?r.innerHTML+=i:n.innerHTML=i}else console.error("Liquid parsing engine is not available");else console.error("No template found for this webmention group",n)}function a(t){for(var e,n,i=t.length;i--;)e=t[i].id,(n=t[i].data.url||t[i].source)&&n.indexOf("twitter.com/")>-1&&n.indexOf("#favorited-by")<0&&(e=n.replace(/^.*?status\/(\d+)$/,"$1")),t[i].id=e+"";return t}function l(t){t.reverse()
;for(var e=[],n=t.length;n--;)JekyllWebmentionIO.existing_webmentions.indexOf(t[n].id)<0&&(e.push(t[n]),JekyllWebmentionIO.existing_webmentions.push(t[n].id));return e}function u(t){t.reverse();for(var e,n,i,r,s,o,a,l=t.length,u=function(t){t&&c(this.id,this.uri,t)};l--;)r=!1,(i=(e=t[l]).data.url||e.source).indexOf("twitter.com/")?r="twitter":i.indexOf("/googleplus/")>-1&&(r="googleplus"),!(s=e.data.published_ts)&&e.verified_date&&(s=e.verified_date),s&&(s=new Date(s).getTime()),n={id:e.id,url:i,source:r,pubdate:s,raw:t[l]},"author"in e.data&&(n.author=t[l].data.author),(o=t[l].activity.type)||(o="googleplus"==r?i.indexOf("/like/")>-1?"like":i.indexOf("/repost/")>-1?"repost":i.indexOf("/comment/")>-1?"reply":"link":"post"),n.type=o,!1,"post"==o&&h(i,u.bind({id:n.id,uri:i})),a=e.data.content,"bookmark"!=o&&"link"!=o&&"post"!=o&&"reply"!=o&&(a=e.activity.sentence_html),n.content=a,t[l]=n;return t}function c(t,n,i){var r,s,o,a=e.querySelector("#webmention-"+t),l=a.querySelector(".webmention__title"),u=e.createElement("html"),c="";u.innerHTML=i,s=u.querySelector("title"),o=u.querySelector("h1"),l.length<0&&(l=a.querySelector(".webmention__content")),l.length>0&&(c=s.length>0?s.innerText:o.length>0?o.innerHTML:"No title available")&&(c=c.replace(/<\/?[^>]+?>}/,""),(r=e.createElement("a")).href=n,r.appendChild(e.createTextNode(c)),l.innerHTML=r.outerHTML)}function h(e,n){if("XMLHttpRequest"in t){var i=new XMLHttpRequest;h=function(t,e){var n=!1;t="//whateverorigin.org/get?url="+encodeURIComponent(t),i.onreadystatechange=function(){4!=this.readyState||n||(n=!0,e(i.responseText))},i.onabort=function(){n||(n=!0,e(!1))},i.onerror=i.onabort,i.open("GET",t),i.send(null)}}else h=function(t,e){e(!1)};return h(e,n)}if("querySelectorAll"in e&&"filter"in[]&&"content"in e.createElement("template")){"JekyllWebmentionIO"in t||(t.JekyllWebmentionIO={}),JekyllWebmentionIO.existing_webmentions=[],JekyllWebmentionIO.processWebmentions=function(t){if(t&&!("error"in t)){var n=t.links.reverse();(n=l(n=a(n))).length&&(s(n=u(n)),this.counter_update_event&&e.dispatchEvent(this.counter_update_event))}};var d={},f={};n(),i(),r()}}(this,this.document),function(t,e){"JekyllWebmentionIO"in t||(t.JekyllWebmentionIO={}),e.types={bookmarks:"bookmark",likes:"like",links:"link",posts:"post",replies:"reply",reposts:"repost",rsvps:"rsvp"}}(this,this.JekyllWebmentionIO);