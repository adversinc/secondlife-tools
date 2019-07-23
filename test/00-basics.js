process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const
	assert = require('assert');

// Libs to test
const SLTools = require("../lib/index");

// Tests
describe('normalize_slname', function() {
	it('should normalize old name', function() {
		const n = SLTools.normalize_slname("Fname Lname");

		assert.equal(n, "Fname Lname");
	});
	it('should normalize new name', function() {
		const n = SLTools.normalize_slname("NewName");

		assert.equal(n, "NewName Resident");
	});
});

describe('slname2str', function() {
	it('should stringify old name', function() {
		const n = SLTools.slname2str("Fname Lname");

		assert.equal(n, "Fname Lname");
	});
	it('should stringify new short name', function() {
		const n = SLTools.slname2str("NewName");

		assert.equal(n, "NewName");
	});
	it('should stringify new complete name', function() {
		const n = SLTools.slname2str("NewName Resident");

		assert.equal(n, "NewName");
	});
});


describe('split_slname', function() {
	it('should split old name', function() {
		const n = SLTools.split_slname("Fname Lname");

		assert.deepEqual(n, ["Fname", "Lname"]);
	});
	it('should split new short name', function() {
		const n = SLTools.split_slname("NewName");

		assert.deepEqual(n, ["NewName", "Resident"]);
	});
	it('should split new complete name', function() {
		const n = SLTools.split_slname("NewName Resident");

		assert.deepEqual(n, ["NewName", "Resident"]);
	});
});


describe('checkSLName', function() {
	it('should succeed', function() {
		assert.ok(SLTools.checkSLName("Fname Lname"));
		assert.ok(SLTools.checkSLName("Fname"));
		assert.ok(SLTools.checkSLName("Fname22 Lname"));
		assert.ok(SLTools.checkSLName("Fname_22 Lname"));
	});
	it('should fail', function() {
		assert.ok(!SLTools.checkSLName("Fname@22 Lname"));
		assert.ok(!SLTools.checkSLName("2Fname Lname"));
		assert.ok(!SLTools.checkSLName("2Fname"));
	});
});


describe('equalSLName', function() {
	it('should succeed', function() {
		assert.ok(SLTools.equalSLName("Fname Lname", "fname lname"));
		assert.ok(SLTools.equalSLName("Fname", "fname resident"));
		assert.ok(SLTools.equalSLName("Fname", "fname Resident"));
	});
	it('should fail', function() {
		assert.ok(!SLTools.equalSLName("Fname", "fname2 Resident"));
	});
});

