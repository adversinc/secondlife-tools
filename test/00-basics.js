process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const
	assert = require('assert');

// Libs to test
const SLTools = require("../lib/index");
console.log("SLTools:", SLTools);

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
		assert.ok(SLTools.checkSLName("2Fname Lname"));
		assert.ok(SLTools.checkSLName("2Fname"));
	});
	it('should fail', function() {
		assert.ok(!SLTools.checkSLName("Fname@22 Lname"));
		assert.ok(!SLTools.checkSLName("_2Fname Lname"));
		assert.ok(!SLTools.checkSLName("_2Fname"));
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


describe('timeToSLT', function() {
	it('should return current time', function() {
		console.log(SLTools.timeToSLT());

		assert.ok(true);
	});
});

describe('slPackSLKey', function() {
	it('should pack correctly', function() {
		const n = SLTools.sbPackSLKey("cd93067e-7c4e-41c0-ba91-be01f4bafe35");
		assert.deepEqual(n, new Uint8Array([220, 57, 96, 231, 199, 228, 20, 12, 171, 25, 235, 16, 79, 171, 239, 83]));
	});

	it('should pack correctly with external buffer', function() {
		const t = Buffer;
		Buffer = require("buffer/").Buffer;

		const n = SLTools.sbPackSLKey("cd93067e-7c4e-41c0-ba91-be01f4bafe35");
		assert.deepEqual(n, new Uint8Array([220, 57, 96, 231, 199, 228, 20, 12, 171, 25, 235, 16, 79, 171, 239, 83]));

		Buffer = t;
	});
});

describe('sbUnpackSLKey', function() {
	it('should unpack correctly', function() {
		const n = SLTools.sbUnpackSLKey([220, 57, 96, 231, 199, 228, 20, 12, 171, 25, 235, 16, 79, 171, 239, 83]);
		assert.equal(n, "cd93067e-7c4e-41c0-ba91-be01f4bafe35");
	});

	it('should unpack correctly with external buffer', function() {
		const t = Buffer;
		Buffer = require("buffer/").Buffer;

		const n = SLTools.sbUnpackSLKey([220, 57, 96, 231, 199, 228, 20, 12, 171, 25, 235, 16, 79, 171, 239, 83]);
		assert.equal(n, "cd93067e-7c4e-41c0-ba91-be01f4bafe35");

		Buffer = t;
	});
});

describe('packSLKey', function() {
	it('should pack correctly', function() {
		const n = SLTools.packSLKey("cd93067e-7c4e-41c0-ba91-be01f4bafe35");
		assert.deepEqual(n, new Uint8Array([0xcd,0x93,0x06,0x7e,0x7c,0x4e,0x41,0xc0,0xba,0x91,0xbe,0x01,0xf4,0xba,0xfe,0x35]));
	});

	it('should pack correctly with external buffer', function() {
		const t = Buffer;
		Buffer = require("buffer/").Buffer;

		const n = SLTools.packSLKey("cd93067e-7c4e-41c0-ba91-be01f4bafe35");
		assert.deepEqual(n, new Uint8Array([0xcd,0x93,0x06,0x7e,0x7c,0x4e,0x41,0xc0,0xba,0x91,0xbe,0x01,0xf4,0xba,0xfe,0x35]));

		Buffer = t;
	});
});



describe('unpackSLKey', function() {
	it('should unpack correctly', function() {
		const n = SLTools.unpackSLKey([0xcd,0x93,0x06,0x7e,0x7c,0x4e,0x41,0xc0,0xba,0x91,0xbe,0x01,0xf4,0xba,0xfe,0x35]);
		assert.equal(n, "cd93067e-7c4e-41c0-ba91-be01f4bafe35");
	});

	it('should unpack correctly with external buffer', function() {
		const t = Buffer;
		Buffer = require("buffer/").Buffer;

		const n = SLTools.unpackSLKey([0xcd,0x93,0x06,0x7e,0x7c,0x4e,0x41,0xc0,0xba,0x91,0xbe,0x01,0xf4,0xba,0xfe,0x35]);
		assert.equal(n, "cd93067e-7c4e-41c0-ba91-be01f4bafe35");

		Buffer = t;
	});
});
