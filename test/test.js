/* global QUnit */

QUnit.config.maxDepth = -1;
QUnit.config.noglobals = true;
QUnit.config.seed = true;

import { schema, } from "../lib/main.js";

QUnit.module("schema", () => {
    QUnit.test("schema is a map of strings", t => {
        t.true(schema instanceof Map);
        schema.forEach((k, v) => {
            t.equal(typeof k, "string");
            t.equal(typeof v, "string");
        },);
    },);
},);

import { வினயினத்துப்பெயர்கள், validவினயினத்துப்பெயர்கள், } from "../lib/vinayinam.js";

QUnit.module("வினயினத்துப்பெயர்கள்", () => {
    QUnit.test("வினயினத்துப்பெயர்கள் is an Array of strings", t => {
        t.true(Array.isArray(வினயினத்துப்பெயர்கள்));
        வினயினத்துப்பெயர்கள்.forEach(வினயினத்துப்பெயர் => {
            t.equal(typeof வினயினத்துப்பெயர், "string");
        },);
    },);
    QUnit.module("validவினயினத்துப்பெயர்கள்", () => {
        const assertValid = (t, வினயினம்,) => (வினய்,) => {
            t.true(validவினயினத்துப்பெயர்கள்(வினய்,).includes(வினயினம்,));
        };
        const assertInvalid = (t, வினயினம்,) => (வினய்,) => {
            t.false(validவினயினத்துப்பெயர்கள்(வினய்,).includes(வினயினம்,));
        };
        QUnit.test("வாங்கு", t => {
            ["ஊது",].forEach(assertValid(t, "வாங்கு",),);
            ["கல்", "கல", "தெரி", "போ",].forEach(assertInvalid(t, "வாங்கு",),);
        },);
        QUnit.test("பார்", t => { t.expect(0); },); // பார் is always a valid இனம்
        QUnit.test("உயர்", t => {
            ["ஈ", "அணி", "மிகு", "உயர்", "வீழ்", "குலய்",].forEach(assertValid(t, "உயர்",),);
            ["கல்", "கல",].forEach(assertInvalid(t, "உயர்",),);
        },);
        QUnit.test("இயல்", t => {
            ["உருள்", "மெல்", "இயல்", "கொள்",].forEach(assertValid(t, "இயல்",),);
            ["ஆ", "வாங்கு", "போ", "அணி",].forEach(assertInvalid(t, "இயல்",),);
        });
        QUnit.test("இரு", t => { t.expect(0); },); // இரு is always a valid இனம்
        QUnit.test("இடு", t => {
            ["போடு", "பெறு",].forEach(assertValid(t, "இடு",),);
            ["ஆ", "வாங்கு", "உயர்", "விழு", "கடி", "தின்", "உண்",].forEach(assertInvalid(t, "இடு",),);
        });
        QUnit.test("செய்", t => { t.expect(0); }); // செய் is always a valid இனம்
        QUnit.test("தின்", t => {
            ["உண்", "என்",].forEach(assertValid(t, "தின்",),);
            ["ஆ", "வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "கல்", "கல",].forEach(assertInvalid(t, "தின்",),);
        },);
        QUnit.test("வா", t => {
            ["தா",].forEach(assertValid(t, "வா",),);
            ["கல்", "கல", "தெரி", "போ", "வாங்கு", "உயர்",].forEach(assertInvalid(t, "வா",),);
        },);
        QUnit.test("சொல்", t => {
            ["சொல்",].forEach(assertValid(t, "சொல்",),);
            ["ஆ", "வாங்கு", "போ", "அணி",].forEach(assertInvalid(t, "சொல்",),);
        },);
        QUnit.test("காண்", t => {
            ["காண்",].forEach(assertValid(t, "காண்",),);
            ["ஆ", "வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல",].forEach(assertInvalid(t, "காண்",),);
        },);
        QUnit.test("போ", t => {
            ["போ", "ஆ", "சா",].forEach(assertValid(t, "போ",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல",].forEach(assertInvalid(t, "போ",),);
        },);
        QUnit.test("ஆ", t => {
            ["போ", "ஆ", "சா",].forEach(assertValid(t, "ஆ",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல",].forEach(assertInvalid(t, "ஆ",),);
        },);
        QUnit.test("நோ", t => {
            ["நோ",].forEach(assertValid(t, "நோ",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல", "சா",].forEach(assertInvalid(t, "நோ",),);
        },);
        QUnit.test("சா", t => {
            ["சா",].forEach(assertValid(t, "சா",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல", "நோ",].forEach(assertInvalid(t, "சா",),);
        },);
        QUnit.test("அல்", t => {
            ["அல்",].forEach(assertValid(t, "அல்",),);
            ["கல்", "கல", "தெரி", "போ",].forEach(assertInvalid(t, "அல்",),);
        },);
        QUnit.test("உள்", t => {
            ["உள்",].forEach(assertValid(t, "உள்",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல", "சா", "போ",].forEach(assertInvalid(t, "உள்",),);
        },);
        QUnit.test("இல்", t => {
            ["இல்",].forEach(assertValid(t, "இல்",),);
            ["வாங்கு", "உயர்", "விழு", "கடி", "பெறு", "தொடு", "உண்", "கல்", "கல", "சா", "போ",].forEach(assertInvalid(t, "இல்",),);
        },);
    },);
},);
