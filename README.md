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
  * imperative (ஏவல் வினய்முற்று)
  * negative finite (எதிர்மறய் வினய்முற்று)
  * past, present and future finite (போனகாலத்தும் நிகழ்காலத்தும் வருங்காலத்தும் வினய்முற்று)
  * absolutive (போனகாலத்து வினயெச்சம்)
  * infinitive (வருங்காலத்து வினயெச்சம்)
  * past, present and future relative participle (போனகாலத்தும் நிகழ்காலத்தும் வருங்காலத்தும் பெயரெச்சம்)
  * verbal noun (தொழிற்பெயர்)
* base (தன்வினய்) and causative (பிறவினய்) levels
* optional traditional spelling (as used above)
* experimenting with a different verb class for a given root

## How to use

### API surface

`lib/ilakkanam.js` exports the following

* `schema` ‐ returns a `Map` of opaque keys to display strings, representing the various verb forms for a given verb.
* `verbClasses` ‐ returns an array of strings representing the various verb classes.
* `validVerbClasses(verb,)` ‐ returns an array of strings representing verb classes that are valid for the given `verb`.
* `getForms(verb, [optional] verbClass, [optional] isModernSpelling?,)` ‐ returns a `Map` of keys from `schema` and values representing the specific verb forms for the `verb`. The optional `verbClass` is needed when the `verb` belongs to multiple classes, like `படு` or `வய்`. `isModernSpelling?` if the forms should use the modern spelling of `ஐ` and `கை` instead of the traditional `அய்` and `கய்`.
* `causativeFormsKey` ‐ returns the name of the opaque key used to index into the return value of `getForms` to get the set of causative forms for the verb, if they exist.

### UI

*Ilakkanam* comes with a basic SPA UI that also tests the API surface. You can access the UI at <https://www.ambari.sh/ilakkanam/> or host it yourself by serving up `index.html`.

## Future work

* Trivially, extend this to general all genders & numbers.
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
