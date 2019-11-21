module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(970);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 962:
/***/ (function(module, exports) {

	module.exports = require("./formatblock");

/***/ }),

/***/ 970:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(962), __webpack_require__(971) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	(function($, undefined) {

	var kendo = window.kendo,
	    extend = $.extend,
	    proxy = $.proxy,
	    Editor = kendo.ui.editor,
	    dom = Editor.Dom,
	    EditorUtils = Editor.EditorUtils,
	    RangeUtils = Editor.RangeUtils,
	    Command = Editor.Command,
	    NS = "kendoEditor",
	    ACTIVESTATE = "k-state-active",
	    SELECTEDSTATE = "k-state-selected",
	    Tool = Editor.Tool,
	    ToolTemplate = Editor.ToolTemplate,
	    InsertHtmlCommand = Editor.InsertHtmlCommand,
	    BlockFormatFinder = Editor.BlockFormatFinder,
	    registerTool = Editor.EditorUtils.registerTool,
	    getTouches = kendo.getTouches;
	var template = kendo.template;

	var columnTemplate = "<td style='width:#=width#%;'>#=content#</td>";

	var tableFormatFinder = new BlockFormatFinder([{tags:["table"]}]);

	var TableCommand = InsertHtmlCommand.extend({
	    init: function(options) {
	        var o = $.extend({
	            postProcess: this.postProcess,
	            skipCleaners: true
	        }, options || {});

	        InsertHtmlCommand.fn.init.call(this, o);
	    },
	    _tableHtml: function(rows, columns) {
	        rows = rows || 1;
	        columns = columns || 1;
	        var columnHtml = template(columnTemplate)({ width: 100 / columns, content: Editor.emptyTableCellContent });
	        var rowHeight = 100 / rows;

	        return "<table class='k-table' data-last>" +
	                    new Array(rows + 1).join(
	                    "<tr style='height:" + rowHeight + "%;'>" +
	                        new Array(columns + 1).join(columnHtml) +
	                    "</tr>") +
	               "</table>";
	    },

	    postProcess: function(editor, range) {
	        var insertedTable = $("table[data-last]", editor.document).removeAttr("data-last");

	        range.setStart(insertedTable.find("td")[0], 0);
	        range.collapse(true);

	        editor.selectRange(range);
	    },

	    exec: function() {
	        var options = this.options;
	        options.html = this._tableHtml(options.rows, options.columns);

	        InsertHtmlCommand.fn.exec.call(this);
	    }
	});

	var PopupTool = Tool.extend({
	    initialize: function(ui, options) {
	        Tool.fn.initialize.call(this, ui, options);

	        var popup = $(this.options.popupTemplate).appendTo("body").kendoPopup({
	            anchor: ui,
	            copyAnchorStyles: false,
	            open: proxy(this._open, this),
	            activate: proxy(this._activate, this),
	            close: proxy(this._close, this)
	        }).data("kendoPopup");

	        ui.click(proxy(this._toggle, this))
	          .keydown(proxy(this._keydown, this));

	        var editor = this._editor = options.editor;
	        this._popup = popup;

	        var tableWizard = new Editor.TableWizardTool({
	            template: new ToolTemplate({ template: EditorUtils.tableWizardButtonTemplate, title: editor.options.messages.tableWizard }),
	            command: Editor.TableWizardCommand,
	            insertNewTable: true
	        });

	        registerTool("tableWizardInsert", tableWizard);

	        var twTool = $("<div class='k-editor-toolbar'>" + tableWizard.options.template.getHtml() + "</div>");
	        twTool.appendTo(popup.element);
	        if (editor.toolbar) {
	            editor.toolbar.attachToolsEvents(twTool);
	        }
	    },

	    popup: function() {
	        return this._popup;
	    },

	    _activate: $.noop,

	    _open: function() {
	        this._popup.options.anchor.addClass(ACTIVESTATE);
	    },

	    _close: function() {
	        this._popup.options.anchor.removeClass(ACTIVESTATE);
	    },

	    _keydown: function(e) {
	        var keys = kendo.keys;
	        var key = e.keyCode;

	        if (key == keys.DOWN && e.altKey) {
	            this._popup.open();
	        } else if (key == keys.ESC) {
	            this._popup.close();
	        }
	    },

	    _toggle: function(e) {
	        var button = $(e.target).closest(".k-tool");

	        if (!button.hasClass("k-state-disabled")) {
	            this.popup().toggle();
	        }
	    },

	    update: function(ui) {
	        var popup = this.popup();

	        if (popup.wrapper && popup.wrapper.css("display") == "block") {
	            popup.close();
	        }

	        ui.removeClass("k-state-hover");
	    },

	    destroy: function() {
	        this._popup.destroy();
	    }
	});

	var InsertTableTool = PopupTool.extend({
	    init: function(options) {
	        this.cols = 8;
	        this.rows = 6;

	        PopupTool.fn.init.call(this, $.extend(options, {
	            command: TableCommand,
	            popupTemplate:
	                "<div class='k-ct-popup'>" +
	                    new Array(this.cols * this.rows + 1).join("<span class='k-ct-cell k-state-disabled' />") +
	                    "<div class='k-status'></div>" +
	                "</div>"
	        }));
	    },

	    _activate: function() {
	        var that = this,
	            element = that._popup.element,
	            cells = element.find(".k-ct-cell"),
	            firstCell = cells.eq(0),
	            lastCell = cells.eq(cells.length - 1),
	            start = kendo.getOffset(firstCell),
	            end = kendo.getOffset(lastCell),
	            cols = that.cols,
	            rows = that.rows,
	            cellWidth, cellHeight;

	        element.find("*").addBack().attr("unselectable", "on");

	        end.left += lastCell[0].offsetWidth;
	        end.top += lastCell[0].offsetHeight;

	        cellWidth = (end.left - start.left) / cols;
	        cellHeight = (end.top - start.top) / rows;

	        function tableFromLocation(e) {
	            var w = $(window);
	            return {
	                row: Math.floor((e.clientY + w.scrollTop() - start.top) / cellHeight) + 1,
	                col: Math.floor((e.clientX + w.scrollLeft() - start.left) / cellWidth) + 1
	            };
	        }

	        element.autoApplyNS(NS)
	            .on("mousemove", ".k-ct-cell", function(e) {
	                that._setTableSize(tableFromLocation(e));
	            })
	            .on("mouseleave", ".k-ct-cell", function() {
	                that._setTableSize();
	            })
	            .on("down", ".k-ct-cell", function(e) {
	                e.preventDefault();
	                var touch = getTouches(e)[0];
	                that._exec(tableFromLocation(touch.location));
	            });
	    },

	    _valid: function(size) {
	        return size && size.row > 0 && size.col > 0 && size.row <= this.rows && size.col <= this.cols;
	    },

	    _exec: function(size) {
	        if (this._valid(size)) {
	            this._editor.exec("createTable", {
	                rows: size.row,
	                columns: size.col
	            });
	            this._popup.close();
	        }
	    },

	    _setTableSize: function(size) {
	        var element = this._popup.element;
	        var status = element.find(".k-status");
	        var cells = element.find(".k-ct-cell");
	        var cols = this.cols;
	        var messages = this._editor.options.messages;

	        if (this._valid(size)) {
	            status.text(kendo.format(messages.createTableHint, size.row, size.col));

	            cells.each(function(i) {
	                $(this).toggleClass(
	                    SELECTEDSTATE,
	                    i % cols < size.col && i / cols < size.row
	                );
	            });
	        } else {
	            status.text(messages.createTable);
	            cells.removeClass(SELECTEDSTATE);
	        }
	    },

	    _keydown: function(e) {
	        PopupTool.fn._keydown.call(this, e);

	        if (!this._popup.visible()) {
	            return;
	        }

	        var keys = kendo.keys;
	        var key = e.keyCode;
	        var cells = this._popup.element.find(".k-ct-cell");
	        var focus = Math.max(cells.filter(".k-state-selected").last().index(), 0);
	        var selectedRows = Math.floor(focus / this.cols);
	        var selectedColumns = focus % this.cols;

	        var changed = false;

	        if (key == keys.DOWN && !e.altKey) {
	            changed = true;
	            selectedRows++;
	        } else if (key == keys.UP) {
	            changed = true;
	            selectedRows--;
	        } else if (key == keys.RIGHT) {
	            changed = true;
	            selectedColumns++;
	        } else if (key == keys.LEFT) {
	            changed = true;
	            selectedColumns--;
	        }

	        var tableSize = {
	            row: Math.max(1, Math.min(this.rows, selectedRows + 1)),
	            col: Math.max(1, Math.min(this.cols, selectedColumns + 1))
	        };

	        if (key == keys.ENTER) {
	            this._exec(tableSize);
	        } else {
	            this._setTableSize(tableSize);
	        }

	        if (changed) {
	            e.preventDefault();
	            e.stopImmediatePropagation();
	        }
	    },

	    _open: function() {
	        var messages = this._editor.options.messages;

	        PopupTool.fn._open.call(this);

	        this.popup().element
	            .find(".k-status").text(messages.createTable).end()
	            .find(".k-ct-cell").removeClass(SELECTEDSTATE);
	    },

	    _close: function() {
	        PopupTool.fn._close.call(this);
	        this.popup().element.off("." + NS);
	    }
	});

	var TableModificationCommand = Command.extend({
	    _clearColIndexAtrr: function (table) {
	        dom.clearTableMappings(table, "col-index");
	    },
	    _mapColIndices: function (table) {
	        dom.reMapTableColumns(table, "col-index");
	    },
	    _findRowSpanCell: function(table, rowIndex, colIndex) {
	        var row, cell;

	        for (var i = rowIndex; i >= 0; i--) {
	            row = table.rows[i];
	            cell = $(row).find("[col-index=" + colIndex +"]");

	            if(cell.length) {
	                return cell;
	            }
	        }
	    },
	    _resetTableResizing: function (editor) {
	        editor._destroyResizings();
	        editor._initializeColumnResizing();
	        editor._initializeRowResizing();
	        editor._initializeTableResizing();
	    },
	    _findNextTdInRow: function (row, colIndex){
	        var lastTd = row.find("td:last-child"),
	            lastIndex = parseInt(lastTd.attr("col-index"), 10) + lastTd.prop("colSpan") - 1,
	            td;

	        for (var i = colIndex; i <= lastIndex; i++) {
	            td = row.find("[col-index=" + i  +"]");
	            if(td.length) {
	                return td;
	            }
	        }
	    }
	});

	var InsertRowCommand = TableModificationCommand.extend({
	    exec: function () {
	        var range = this.lockRange(true),
	            td = dom.closest(range.endContainer, ["td", "th"]),
	            table = dom.closest(td, "table"),
	            position = this.options.position || "after",
	            cellCount, row, lastTd, cell,
	            newRow, rowIndex, rowSpanIndex;

	        if (!table || (this.immutables() && Editor.Immutables.immutableParent(td))) {
	            return;
	        }

	        this._mapColIndices(table);

	        row = td.parentNode;
	        rowIndex = dom.findNodeIndex(row, true);

	        if(td.rowSpan > 1 && position === "after") {
	            row = table.rows[rowIndex + td.rowSpan - 1];
	        }

	        cellCount = table.rows[0].cells.length;
	        lastTd = table.rows[0].cells[cellCount - 1];
	        cellCount = parseInt(lastTd.getAttribute("col-index"), 10) + lastTd.colSpan - 1;
	        newRow = row.cloneNode(true);
	        $(newRow).empty();

	        for (var i = 0; i <= cellCount; i = i + cell.prop("colSpan")) {
	            cell = $(row).find("[col-index=" + i +"]");

	            if (cell.length) {
	                if(cell.prop("rowSpan") > 1 && position === "after" && cell) {
	                    cell.attr("rowspan", cell.prop("rowSpan") + 1);
	                } else {
	                    this._appendCell(newRow, cell);
	                }
	            } else {
	                rowIndex = dom.findNodeIndex(row, true);
	                cell = this._findRowSpanCell(table, rowIndex, i);
	                rowSpanIndex = cell.closest("tr").index();

	                if(rowSpanIndex + cell.prop("rowSpan") - 1 === rowIndex && position === "after") {
	                    this._appendCell(newRow, cell);
	                } else {
	                    cell.attr("rowspan", cell.prop("rowSpan") + 1);
	                }
	            }
	        }

	        if (position == "before") {
	            dom.insertBefore(newRow, row);
	        } else {
	            dom.insertAfter(newRow, row);
	        }

	        this._clearColIndexAtrr(table);
	        this.releaseRange(range);

	        this._resetTableResizing(this.editor);
	    },
	    _appendCell: function(row, cell){
	        var newCell;

	        newCell = cell.clone();
	        newCell.html(Editor.emptyTableCellContent);
	        newCell.removeAttr("rowspan");
	        newCell.appendTo(row);
	    }
	});

	var InsertColumnCommand = TableModificationCommand.extend({
	    exec: function () {
	        var range = this.lockRange(true),
	            td = dom.closest(range.endContainer, ["td", "th"]),
	            table = dom.closest(td, "table"),
	            columnIndex,
	            i,
	            rows = table && table.rows,
	            cell,
	            newCell,
	            position = this.options.position || "after";


	        if (!td || (this.immutables() && Editor.Immutables.immutableParent(td))) {
	            return;
	        }

	        this._mapColIndices(table);

	        columnIndex = parseInt(td.getAttribute("col-index"),10);

	        if (td.colSpan > 1 && position === "after") {
	            td.setAttribute("col-index", columnIndex + td.colSpan - 1);
	            columnIndex = columnIndex + td.colSpan - 1;
	        }

	        for (i = 0; i < rows.length; i++) {
	            cell = this._processForColSpan(rows[i], columnIndex, position, td);

	            if (!cell){
	                continue;
	            }

	            newCell = cell.cloneNode();
	            newCell.innerHTML = Editor.emptyTableCellContent;
	            newCell.removeAttribute("colspan");

	            if (position == "before") {
	                dom.insertBefore(newCell, cell);
	            } else {
	                dom.insertAfter(newCell, cell);
	            }

	            this._resizeCells(newCell, cell);
	        }


	        this._clearColIndexAtrr(table);
	        this.releaseRange(range);

	        this._resetTableResizing(this.editor);
	    },
	    _processForColSpan: function (row, columnIndex, position, selectedCell) {
	        var cell,
	            colSpanEffect,
	            index = columnIndex - 1;

	        cell = $(row).find("[col-index=" + columnIndex +"]")[0];

	        if (cell && cell.colSpan > 1 && position === "after" && cell !== selectedCell) {
	            cell.colSpan += 1;
	            return;
	        }

	        if (cell) {
	            return cell;
	        }

	        for (index; index >= 0; index--) {
	            cell = $(row).find("[col-index=" + index +"]")[0];

	            if(cell && cell.colSpan > 1) {
	                break;
	            }
	        }

	        if(!cell) {
	            return;
	        }

	        colSpanEffect = parseInt(cell.getAttribute("col-index"),10) + cell.colSpan - 1;

	        if(colSpanEffect === columnIndex && position === "after") {
	            return cell;
	        } else if (columnIndex <= colSpanEffect){
	            cell.setAttribute("colspan", cell.colSpan + 1);
	        }
	    },
	    _resizeCells: function(newCell, cell) {
	        var width = newCell.style.width,
	        parsedWidth, unit, calculatedWidth;

	        if(!width) {
	            return;
	        }

	        parsedWidth = parseFloat(width);
	        unit = width.slice(parsedWidth.toString().length);
	        calculatedWidth = (parsedWidth / 2) + unit;

	        newCell.style.width = calculatedWidth;
	        cell.style.width = calculatedWidth;
	    }
	});

	var DeleteRowCommand = TableModificationCommand.extend({
	    exec: function () {
	        var range = this.lockRange();
	        var rows = RangeUtils.mapAll(range, function(node) {
	            return $(node).closest("tr")[0];
	        });
	        var td = dom.closest(range.endContainer, ["td", "th"]);
	        var row = rows[0];
	        var rowSpan = td ? td.rowSpan : 1;
	        var rowIndex = $(rows[0]).index();
	        var table = dom.closest(row, "table");
	        var focusElement;

	        if (!table || (this.immutables() && Editor.Immutables.immutableParent(row))) {
	            return;
	        }

	        for (var x = 0; x < rowSpan; x++) {
	            if(rows.indexOf(table.rows[rowIndex + x]) < 0) {
	                rows.push(table.rows[rowIndex + x]);
	            }
	        }

	        if (table.rows.length <= rows.length) {
	            focusElement = dom.next(table);
	            if (!focusElement || dom.insignificant(focusElement)) {
	                focusElement = dom.prev(table);
	            }

	            dom.remove(table);
	            this._resetTableResizing(this.editor);
	        } else {
	            this._mapColIndices(table);

	            for (var i = 0; i < rows.length; i++) {
	                row = rows[i];
	                dom.removeTextSiblings(row);

	                focusElement = dom.next(row) || dom.prev(row);
	                focusElement = focusElement.cells[0];

	                this._handleRowSpanCells(table, row);

	                dom.remove(row);
	            }


	            this._clearColIndexAtrr(table);
	        }

	        if (focusElement) {
	            range.setStart(focusElement, 0);
	            range.collapse(true);
	            this.editor.selectRange(range);
	        }

	        this._resetTableResizing(this.editor);
	    },
	    _handleRowSpanCells: function (table, row) {
	        var index, cell, adjacentCell, nextRow, rowIndex = dom.findNodeIndex(row, true),
	            firstRow = table.rows[0],
	            lastCell = firstRow.cells[firstRow.cells.length - 1],
	            lastIndex = parseInt(lastCell.getAttribute("col-index"),10) + lastCell.colSpan - 1;

	        for (index = 0; index <= lastIndex; index = index + cell.prop("colSpan")) {
	            cell = $(row).find("[col-index=" + index + "]");

	            if(cell.length && cell.prop("rowSpan") > 1) {
	                nextRow = table.rows[rowIndex+1];
	                adjacentCell = $(nextRow).find("[col-index=" + (index + 1) + "]");

	                if(adjacentCell.length) {
	                    adjacentCell.before(cell);
	                } else {
	                    $(nextRow).append(cell);
	                }
	                this._reduceRowSpan(cell);
	            }

	            if(!cell.length) {
	                cell = this._findRowSpanCell(table, rowIndex, index);
	                this._reduceRowSpan(cell);
	            }
	        }
	    },
	    _reduceRowSpan: function (td) {
	        var rowSpanValue = td.prop("rowSpan") - 1;

	        if(rowSpanValue <= 1) {
	            td.removeAttr("rowspan");
	        } else {
	            td.attr("rowspan", rowSpanValue);
	        }
	    }
	});

	var DeleteColumnCommand = TableModificationCommand.extend({
	    exec: function () {
	        var range = this.lockRange(),
	            td = dom.closest(range.endContainer, ["td", "th"]),
	            table = dom.closest(td, "table"),
	            rows = table && table.rows,
	            columnIndex = dom.findNodeIndex(td, true),
	            columnCount = rows && rows[0].cells.length,
	            focusElement, i, cell, x;

	        if (!td || (this.immutables() && Editor.Immutables.immutableParent(td))) {
	            return;
	        }

	        if (columnCount == 1 || td.colSpan == columnCount) {
	            focusElement = dom.next(table);
	            if (!focusElement || dom.insignificant(focusElement)) {
	                focusElement = dom.prev(table);
	            }

	            dom.remove(table);
	            this._resetTableResizing(this.editor);
	        } else {
	            dom.removeTextSiblings(td);

	            focusElement = dom.next(td) || dom.prev(td);

	            this._mapColIndices(table);

	            columnIndex = parseInt(td.getAttribute("col-index"), 10);

	            for (x = 0; x < td.colSpan; x++) {
	                for (i = 0; i < rows.length; i = i + (cell.prop("rowSpan") || 1)) {
	                    cell = $(rows[i]).find("[col-index=" + (columnIndex + x) + "]");

	                    if(cell.length && cell.prop("colSpan") <= 1) {
	                        cell.remove();
	                    } else {
	                        this._handleColSpanCells(rows[i], columnIndex + x);
	                    }
	                }
	            }

	            this._clearColIndexAtrr(table);
	        }

	        if (focusElement) {
	            range.setStart(focusElement, 0);
	            range.collapse(true);
	            this.editor.selectRange(range);
	        }

	        this._resetTableResizing(this.editor);
	    },
	    _handleColSpanCells: function (row, colIndex) {
	        var cell = $(row).find("[col-index=" + colIndex + "]");

	        if(cell.length && cell.prop("colSpan") > 1) {
	            var clone = cell.clone(true);
	            cell.after(clone);
	            this._reduceColSpan(clone);
	            clone.attr("col-index", parseInt(cell.attr("col-index"),10) + 1);
	            cell.remove();
	            return;
	        }

	        for (var i = colIndex; i >= 0; i--) {
	            cell = $(row).find("[col-index=" + i + "]");

	            if(cell.length) {
	                this._reduceColSpan(cell);
	                cell.attr("col-index", parseInt(cell.attr("col-index"),10) + 1);
	                return;
	            }
	        }
	    },
	    _reduceColSpan: function (td) {
	        var colSpanValue = td.prop("colSpan") - 1;

	        if(colSpanValue <= 1) {
	            td.removeAttr("colspan");
	        } else {
	            td.attr("colspan", colSpanValue);
	        }
	    }
	});

	var MergeCellsHorizontallyCommand = TableModificationCommand.extend({
	    exec: function () {
	        var range = this.lockRange(),
	            td = dom.closest(range.endContainer, ["td", "th"]),
	            table, row, columnIndex, nextTd;

	            if(!td) {
	                return;
	            }

	            table = dom.closest(td, "table");
	            row = td.parentNode;
	            columnIndex = dom.findNodeIndex(td, true);
	            nextTd = row.children[columnIndex + 1];

	            if (this.immutables() && Editor.Immutables.immutableParent(td)) {
	                return;
	            }

	            this._mapColIndices(table);

	            columnIndex = parseInt($(td).attr("col-index"), 10);
	            nextTd = $(row).find("[col-index=" + (columnIndex + 1 + this._getColspan(td) - 1) + "]").get(0);

	            if(!nextTd || nextTd.rowSpan !== td.rowSpan) {
	                this._clearColIndexAtrr(table);
	                this.releaseRange(range);
	                return;
	            }

	            $(td).prop("colspan", this._getColspan(td) + this._getColspan(nextTd))
	                 .append(dom.emptyNode(nextTd) ? "" : "<br/>" + nextTd.innerHTML);

	            $(td).width(td.offsetWidth);
	            $(nextTd).remove();

	            this._clearColIndexAtrr(table);
	            this.releaseRange(range);
	            this._resetTableResizing(this.editor);
	    },
	    _getColspan: function (td) {
	        return parseInt(td.getAttribute("colspan"), 10) || 1;
	    }
	});

	var MergeCellsVerticallyCommand = TableModificationCommand.extend({
	    exec: function () {
	        var range = this.lockRange(),
	            td = dom.closest(range.endContainer, ["td", "th"]),
	            tr, table, columnIndex, rowIndex, targetRow,  bottomTd;

	            if(!td) {
	                return;
	            }

	            tr = dom.closest(td,"tr");
	            table = dom.closest(td, "table");
	            columnIndex = dom.findNodeIndex(td, true);
	            rowIndex = dom.findNodeIndex(tr, true);
	            targetRow = table.rows[rowIndex + this._getRowspan(td)];
	            bottomTd = targetRow && targetRow.children[columnIndex];

	            if (this.immutables() && Editor.Immutables.immutableParent(td)) {
	                return;
	            }

	            this._mapColIndices(table);

	            columnIndex = $(td).attr("col-index");
	            bottomTd = $(targetRow).find("[col-index=" + columnIndex + "]").get(0);

	            if(!bottomTd || bottomTd.colSpan !== td.colSpan) {
	                this._clearColIndexAtrr(table);
	                this.releaseRange(range);
	                return;
	            }

	            $(td).prop("rowspan", this._getRowspan(td) + this._getRowspan(bottomTd))
	                 .append(dom.emptyNode(bottomTd) ? "" : "<br/>" + bottomTd.innerHTML);

	            $(bottomTd).remove();

	            this._clearColIndexAtrr(table);
	            this.releaseRange(range);
	    },
	    _getRowspan: function (td) {
	        return parseInt(td.getAttribute("rowspan"), 10) || 1;
	    }
	});

	var SplitCellCommand = TableModificationCommand.extend({
	    exec: function () {
	        var range = this.lockRange(),
	            type = this.options.type,
	            attr = type === "row" ? "colspan" : "rowspan",
	            td = dom.closest(range.endContainer, ["td", "th"]),
	            table = dom.closest(td, "table"),
	            emptyTd = dom.createEmptyNode(this.editor.document, td.nodeName.toLowerCase());

	        if (!td || (this.immutables() && Editor.Immutables.immutableParent(td))) {
	            return;
	        }

	        this._mapColIndices(table);

	        if(type === "row" && $(td).is("[" + attr + "]")) {
	            this._splitCellHorizontally(td, table, attr, emptyTd);
	        } else if (type === "column" && $(td).is("[" + attr + "]")){
	            this._splitCellVertically(td, table, attr, emptyTd);
	        }

	        if($(td).prop(attr.toLowerCase()) <= 1) {
	            $(td).removeAttr(attr);
	        }

	        this._clearColIndexAtrr(table);
	        this.releaseRange(range);
	    },
	    _getRowspanValue: function (td) {
	        return parseInt(td.getAttribute("rowspan"), 10);
	    },
	    _getColspanValue: function (td) {
	        return parseInt(td.getAttribute("colspan"), 10);
	    },
	    _splitCellHorizontally: function (td, table, attr, emptyTd) {
	        var rowSpan = td.rowSpan,
	            colSpan = td.colSpan,
	            tdToAdd = $(emptyTd),
	            colSpanResult = Math.floor(colSpan/2);

	            if(colSpanResult > 1) {
	                tdToAdd.attr("colspan", colSpanResult);
	            }

	            if(rowSpan > 1) {
	                tdToAdd.attr("rowspan", rowSpan);
	            }

	            $(td).prop(attr, colSpan - colSpanResult)
	                .after(tdToAdd);

	            $(td).width(td.offsetWidth);
	            tdToAdd.width(tdToAdd[0].offsetWidth);
	    },
	    _splitCellVertically: function (td, table, attr, emptyTd) {
	        var tr = dom.closest(td,"tr"),
	            columnIndex = parseInt($(td).attr("col-index"), 10),
	            rowIndex = dom.findNodeIndex(tr, true),
	            rowSpan = td.rowSpan,
	            colSpan = td.colSpan,
	            rowSpanResult = Math.floor(rowSpan/2),
	            targetRow = $(table).find("tr").eq(rowIndex + rowSpan - rowSpanResult),
	            nextTd = this._findNextTdInRow(targetRow, columnIndex + colSpan),
	            tdToAdd = $(emptyTd);

	            if(rowSpanResult > 1) {
	                tdToAdd.attr("rowspan", rowSpanResult);
	            }

	            if(colSpan > 1) {
	                tdToAdd.attr("colspan", colSpan);
	            }

	            if(nextTd && nextTd.length) {
	                nextTd.before(tdToAdd);
	            } else {
	                targetRow.append(tdToAdd);
	            }

	            $(td).prop(attr, rowSpan - rowSpanResult);
	    }
	});

	var TableModificationTool = Tool.extend({
	    command: function (options) {
	        var commandsMap = {
	            row: {
	                insert: InsertRowCommand,
	                "delete": DeleteRowCommand,
	                merge: MergeCellsHorizontallyCommand,
	                split: SplitCellCommand
	            },
	            column: {
	                insert: InsertColumnCommand,
	                "delete": DeleteColumnCommand,
	                merge: MergeCellsVerticallyCommand,
	                split: SplitCellCommand
	            }
	        };

	        options = extend(options, this.options);
	        options.action = options.action || "insert";

	       return new commandsMap[options.type][options.action](options);
	    },

	    initialize: function(ui, options) {
	        Tool.fn.initialize.call(this, ui, options);
	        ui.addClass("k-state-disabled");
	    },

	    update: function(ui, nodes) {
	        var isFormatted = !tableFormatFinder.isFormatted(nodes);
	        ui.toggleClass("k-state-disabled", isFormatted);
	    }
	});

	extend(kendo.ui.editor, {
	    PopupTool: PopupTool,
	    TableCommand: TableCommand,
	    InsertTableTool: InsertTableTool,
	    TableModificationTool: TableModificationTool,
	    InsertRowCommand: InsertRowCommand,
	    InsertColumnCommand: InsertColumnCommand,
	    DeleteRowCommand: DeleteRowCommand,
	    DeleteColumnCommand: DeleteColumnCommand,
	    MergeCellsHorizontallyCommand: MergeCellsHorizontallyCommand,
	    MergeCellsVerticallyCommand: MergeCellsVerticallyCommand,
	    SplitCellCommand: SplitCellCommand
	});

	registerTool("createTable", new InsertTableTool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, popup: true, title: "Create table"})}));

	registerTool("addColumnLeft", new TableModificationTool({ type: "column", position: "before", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add column on the left"})}));
	registerTool("addColumnRight", new TableModificationTool({ type: "column", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add column on the right"})}));
	registerTool("addRowAbove", new TableModificationTool({ type: "row", position: "before", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add row above"})}));
	registerTool("addRowBelow", new TableModificationTool({ type: "row", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add row below"})}));
	registerTool("deleteRow", new TableModificationTool({ type: "row", action: "delete", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Delete row"})}));
	registerTool("deleteColumn", new TableModificationTool({ type: "column", action: "delete", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Delete column"})}));
	registerTool("mergeCellsHorizontally", new TableModificationTool({type: "row", action: "merge", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Merge Cell Right"})}));
	registerTool("mergeCellsVertically", new TableModificationTool({type: "column", action: "merge", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Merge Cell Down"})}));
	registerTool("splitCellHorizontally", new TableModificationTool({type: "row", action: "split", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Split Cell"})}));
	registerTool("splitCellVertically", new TableModificationTool({type: "column", action: "split", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Split Cell"})}));

	})(window.kendo.jQuery);

	}, __webpack_require__(3));


/***/ }),

/***/ 971:
/***/ (function(module, exports) {

	module.exports = require("./insert");

/***/ })

/******/ });