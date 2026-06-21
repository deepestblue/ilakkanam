# ilakkanam

[![GitHub release (latest SemVer including pre‐releases)](https://img.shields.io/github/v/release/deepestblue/ilakkanam?include_prereleases&sort=semver&style=for-the-badge)](https://github.com/deepestblue/ilakkanam/releases) [![Licence: AGPL‐3.0](https://img.shields.io/github/license/deepestblue/ilakkanam?label=LICENCE&style=for-the-badge)](https://www.gnu.org/licenses/agpl-3.0.en.html) [![GitHub issues](https://img.shields.io/github/issues/deepestblue/ilakkanam?style=for-the-badge)](https://github.com/deepestblue/ilakkanam/issues)

**Ilakkanam** (இலக்கணம்) is a library and barebones UI that generates verbal forms from Tamil verb roots.

## History

A few years ago I encountered Jeyapandian Kottalam's wonderful book [Learning Tamil by yourself](https://docs.google.com/file/d/0BzwpbxABzaV5MHotLVVKal9xYUE/edit?pli=1&resourcekey=0-jkzteXUFm1SDbes19misUg). Even as a native Tamil speaker I learnt a few different things, chief of which was the existence of verb classes in Tamil. I was familiar with verb classes from my study of Sanskrit and Latin grammar, and I was also familiar with different Tamil verbs having different declensions, but I wasn't aware of the existence of a near‐complete verbal classification in Tamil.

I decided to implement the rules in code. I ended up separating out sandhi (புணர்ச்சி) rules, which allowed me to combine the classes into fewer, more logical ones. For testing, I used native Dravidian roots from Thiru. Jeyapandian's own verbal corpus, but found it wanting and supplemented it with [a list by Harold Schiffman & Vasu Renganathan](http://www.tamilverb.com/browse).

I also threw together a basic UI that showcases the forms generatable through just a small set of rules.

## Feature set

*Ilakkanam* supports

* the following forms:
  * ஏவல் வினய்முற்றும் எதிர்மறயேவல் வினய்முற்றும் வியங்கோள் வினய்முற்று (imperative, prohibitive and optative)
  * தொழிற்பெயரும் எதிர்மறய்த் தொழிற்பெயரும் (verbal noun and negative verbal noun)
  * வருங்காலத்தும் போனகாலத்தும் நிபந்தனய் வினயெச்சம் (past and non‐past conditional)
  * எதிர்மறயும் வருங்காலத்தும் போனகாலத்தும் வினயெச்சம் (negative, non‐past and past adverbial participle)
  * எதிர்மறயும் வருங்காலத்தும் நிகழ்காலத்தும் போனகாலத்தும் பெயரெச்சம் (negative, future, present and past relative participle)
  * எதிர்மறயும் வருங்காலத்தும் நிகழ்காலத்தும் போனகாலத்தும் பெயரெச்சத்துப் பெயர் (negative, future, present and past relative participial noun)
  * எதிர்மறயும் போனகாலத்தும் நிகழ்காலத்தும் வருங்காலத்தும் வினய்முற்று (negative, past, present and future finite)
* தன்வினய் (base) and பிறவினய் (causative) levels
* optional traditional spelling (as used above)

The following periphrastic forms are not generated:

* ஆகயால், etc., which are ஆகய் + ஆல்.
* செய்யாததால், etc. which are செய்யாதது + ஆல்.
* சிரிக்கயில், etc., which are சிரிக்கய் + இல்.
* தந்தாலும், etc., which are தந்தால் + உம்.
* சேராதே, etc., which are சேராது + ஏ.
* தூங்கலாம், etc., which are தூங்கல் + ஆம் from √ஆம்.
* போகமாட்டேன், etc., which are போக ‍‍+ மாட்டேன் from √மாட்டு.
* நம்பவேண்டும், etc., which are நம்ப ‍‍+ வேண்டும் from √வேண்டு.
* உணரவில்லய், etc., which are உணர + இல்லய் from √இல்.
* வெட்டாதீர், etc., which seem from வெட்டாது + an anomalous ஈர்.
* தொடாமலிரு, etc., which are from தொடாமல் + இரு from √இரு.
* முடித்துவிடு, முடிக்காவிட்டால், முடித்திக்கொள், முடித்துவிட்டிரு, முடிக்கப்படு, முடித்துக்கொண்டிரு, etc., which are from the forms of √முடி + respectively the forms of √விடு, again √விடு, √கொள், √விடு‍+√இரு, √படு, √கொள்+√இரு, etc.
* பொங்கட்டும், etc., which are corrupt forms of originally பொங்கவொட்டும், etc., from பொங்க + ஒட்டும், in turn from √ஒட்டு.

Nor are conjugated forms of பெயரெச்சத்துப் பெயர் like ஆடுகிறவர்களோடு.

## How to use

### API surface

`lib/ilakkanam.js` exports the following

* `getForms(verb, [optional] verbClass, [optional] spellingStyle = spellingStyle.பழயது,)` — returns a tree structure of keyed nodes whose `வடிவு` values represent the specific verb forms for the `verb` (a `Set` of form strings on leaves, or a string on metadata nodes). The optional `verbClass` is an இனத்துப்பெயர் needed when the `verb` belongs to multiple classes, like `படு` or `வய்`; without it, `getForms` throws an `Error` whose `cause` is `{ code: "ambiguousVerbClass", classes: string[], }`. The optional `spellingStyle` is `spellingStyle.பழயது` (default) or `spellingStyle.புதியது` for modern spelling of `ஐ` and `கை` instead of the traditional `அய்` and `கய்`.
* `causativeFormsKey` — the opaque key used to index into the return value of `getForms` to get the set of causative forms for the verb, if they exist.
* `spellingStyle` — `{ பழயது, புதியது, }`, passed as the optional `spellingStyle` to `getForms`.
* `verbsStartingWith(prefix,)` — returns a sorted array of known verb roots whose traditional spelling starts with `prefix`. The supplied UI uses this for autocomplete.
* `conversionsToNewSpelling` — an array of functions that together convert text from the traditional to the new spelling using `ஐ` and the corresponding vowel marker; reduce left‐to‐right over a string.
* `conversionsToOldSpelling` — an array of functions that together convert text from the new to the traditional spelling; the inverse of `conversionsToNewSpelling`.

### UI

*Ilakkanam* comes with a basic SPA UI that also tests the API surface. You can access the UI at <https://www.ambari.sh/ilakkanam/> or host it yourself by serving up `index.html`.

## Future work

* Generate other gerund forms using other suffixes, like ஆட்டம் from √ஆடு + ‌‌‐அம் or தீர்ப்பு from √தீர் + ‐ப்பு.
* Explore what it could be to codify more and more Tamil words and end up with sort of like an aṣṭādhyāyī for Tamil.

## Acknowledgements

Thanks to:

* Jeyapandian Kottalam. Learning Tamil By Yourself, <https://docs.google.com/file/d/0BzwpbxABzaV5MHotLVVKal9xYUE/edit?pli=1&resourcekey=0-jkzteXUFm1SDbes19misUg>. Accessed 24 Nov. 2024.
* Harold Schiffman and Vasu Renganathan. An English Dictionary of the Tamil Verb, <https://tamilverb.com/browse>. Accessed 24 Nov. 2024.
* C. T. E. Rhenius. A Grammar of the Tamil Language.
* Bh. Krishnamurti. The Dravidian Languages.
* agarathi.com. Tamil Dictionary, <https://agarathi.com/>. Accessed 24 Nov. 2024.
* Create a Single Page Application using HTML CSS & JavaScript. <https://www.geeksforgeeks.org/create-a-single-page-application-using-html-css-javascript/>.
