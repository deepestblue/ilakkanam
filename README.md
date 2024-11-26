# vinayinam

[![GitHub release (latest SemVer including pre‐releases)](https://img.shields.io/github/v/release/deepestblue/vinayinam?include_prereleases&sort=semver&style=for-the-badge)](https://github.com/deepestblue/vinayinam/releases) [![Licence: AGPL‐3.0](https://img.shields.io/github/license/deepestblue/vinayinam?label=LICENCE&style=for-the-badge)](https://www.gnu.org/licenses/agpl-3.0.en.html) [![GitHub issues](https://img.shields.io/github/issues/deepestblue/vinayinam?style=for-the-badge)](https://github.com/deepestblue/vinayinam/issues)

**Vinayinam** (வினயினம், the traditional spelling of the modern வினையினம்) is a library and barebones UI that generates verbal forms from Tamil verb roots.

## History

A few years ago I encountered Jeyapandian Kottalam's wonderful book [Learning Tamil by yourself](https://docs.google.com/file/d/0BzwpbxABzaV5MHotLVVKal9xYUE/edit?pli=1&resourcekey=0-jkzteXUFm1SDbes19misUg). Even as a native Tamil speaker I learnt a few different things, chief of which was the existence of verb classes in Tamil. I was familiar with verb classes from my study of Sanskrit and Latin grammar, and I was also familiar with different Tamil verbs having different declensions, but I wasn't aware of the existence of a near‐complete verbal classification in Tamil.

I decided to implement the rules in code. I ended up separating out sandhi (புணர்ச்சி) rules, which allowed me to combine the classes into fewer, more logical ones. For testing, I used native Dravidian roots from Thiru. Jeyapandian's own verbal corpus, but found it wanting and supplemented it with [a list by Harold Schiffman & Vasu Renganathan](http://www.tamilverb.com/browse).

I also threw together a basic UI that showcases the forms generatable through just a small set of rules.

## Feature set

*Vinayinam* supports

* the following forms:
  * imperative (ஏவல் வினைமுற்று)
  * negative indicative (எதிர்மறை வினைமுற்று)
  * past, present and future indicatives (இறந்தகாலத்தும் நிகழ்காலத்தும் எதிர்காலத்தும் வினைமுற்று)
  * absolutive (இறந்தகாலத்து வினையெச்சம்)
  * infinitive (எதிர்காலத்து வினையெச்சம்)
  * past, present and future participles (இறந்தகாலத்தும் நிகழ்காலத்தும் எதிர்காலத்தும் பெயரெச்சம்)
  * gerund (தொழிற்பெயர்)
* base (தன்வினை) and causative (பிறவினை) levels
* optional traditional spelling
* experimenting with a different verb class for a given root

## How to use

### API surface

`lib/main.js` exports the following

* `schema` ‐ returns a `Map` of opaque keys to display strings, representing the various verb forms for a given verb.
* `getForms(verb, [optional] verbClass, [optional] isModernSpelling?,)` ‐ returns a `Map` of keys from `schema` and values representing the specific verb forms for the `verb`. The optional `verbClass` is needed when the `verb` belongs to multiple classes, like `படு` or `மாட்டு`. `isModernSpelling?` if the forms should use the modern spelling of `ஐ` and `கை` instead of the traditional `அய்` and `கய்`.
* `causativeFormsKey` ‐ returns the name of the opaque key used to index into the return value of `getForms` to get the set of causative forms for the verb, if they exist.
* `verbClasses` ‐ returns an array of strings representing the various verb classes.
* `validVerbClasses(verb,)` ‐ returns an array of strings representing verb classes that are valid for the given `verb`.
* `isRecoverable(exception,)` ‐ returns whether an exception thrown represents a recoverable exception with a `message` to display, or a fatal exception.

### UI

*Vinayinam* comes with a basic UI that also tests the API surface. The UI is accessible through `index.html` and is hosted at <https://www.ambari.sh/vinayinam/>.

## Future work

* Trivially, extend this to general all genders & numbers.
* Generate other gerund forms using other suffixes, like ஆட்டம் from √ஆடு + ‌‌‐அம் or தீர்ப்பு from √தீர் + ‐ப்பு.
* Explore what it could be to codify more and more Tamil words and end up with sort of like an aṣṭādhyāyī for Tamil.

## Acknowledgements

Thanks to:

* Jeyapandian Kottalam. Learning Tamil By Yourself, <https://docs.google.com/file/d/0BzwpbxABzaV5MHotLVVKal9xYUE/edit?pli=1&resourcekey=0-jkzteXUFm1SDbes19misUg>. Accessed 24 Nov. 2024.
* Harold Schiffman and Vasu Renganathan. An English Dictionary of the Tamil Verb, <https://tamilverb.com/browse>. Accessed 24 Nov. 2024.
* agarathi.com. Tamil Dictionary, <https://agarathi.com/>. Accessed 24 Nov. 2024.
