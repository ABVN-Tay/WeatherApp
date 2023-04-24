/*global QUnit*/

sap.ui.define([
	"rdc/controller/MainMart.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MainMart Controller");

	QUnit.test("I should test the MainMart controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
