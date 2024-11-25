# vinayinam

[![GitHub release (latest SemVer including pre‐releases)](https://img.shields.io/github/v/release/deepestblue/vinayinam?include_prereleases&sort=semver&style=for-the-badge)](https://github.com/deepestblue/vinayinam/releases) [![Licence: AGPL‐3.0](https://img.shields.io/github/license/deepestblue/vinayinam?label=LICENCE&style=for-the-badge)](https://www.gnu.org/licenses/agpl-3.0.en.html) [![GitHub issues](https://img.shields.io/github/issues/deepestblue/vinayinam?style=for-the-badge)](https://github.com/deepestblue/vinayinam/issues)

vinayinam (வினயினம் or வினையினம் per the modern spelling) is a library and barebones UI that generates verbal forms from Tamil verb roots.

## History

A few years ago I encountered Jeyapandian Kottalam's wonderful book [Learning Tamil by yourself](https://docs.google.com/file/d/0BzwpbxABzaV5MHotLVVKal9xYUE/edit?pli=1&resourcekey=0-jkzteXUFm1SDbes19misUg). Even as a native Tamil speaker I learnt a few different things, chief of which was the existence of verb classes in Tamil. I was familiar with verb classes from my study of Sanskrit and Latin grammar, and I was also familiar with different Tamil verbs having different declensions, but I wasn't aware of the existence of a near‐complete verbal classification in Tamil.

I decided to implement the rules in code. I ended up separating out sandhi (புணர்ச்சி) rules, which allowed me to combine the classes into fewer, more logical ones. For testing, I used native Dravidian roots from Thiru. Jeyapandian's own verbal corpus, but found it wanting and supplemented it with [a list by Harold Schiffman & Vasu Renganathan](http://www.tamilverb.com/browse).

I also threw together a basic UI that showcases the forms generatable through just a small set of rules.

## Feature set

The generator supports

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

### UI

## Future work

* Trivially, extend this to general all genders & numbers.
* Generate other gerund forms using other suffixes, like ஆட்டம் from √ஆடு + ‌‌‐அம் or தீர்ப்பு from √தீர் + ‐ப்பு.
* Explore what it could be to codify more and more Tamil words and end up with sort of like an aṣṭādhyāyī for Tamil.

## Acknowledgements

Thanks to:

* Kottalam, Jeyapandian. Learning Tamil By Yourself, https://docs.google.com/file/d/0BzwpbxABzaV5MHotLVVKal9xYUE/edit?pli=1&resourcekey=0-jkzteXUFm1SDbes19misUg. Accessed 24 Nov. 2024. 
* Schiffman, Harold, and Vasu Renganathan. An English Dictionary of the Tamil Verb, https://tamilverb.com/browse. Accessed 24 Nov. 2024.
* agarathi.com. Tamil Dictionary, https://agarathi.com/. Accessed 24 Nov. 2024.
