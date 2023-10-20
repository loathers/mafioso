==============================================================
------------------------ INTRODUCTION ------------------------
==============================================================

This log parser is an attempt to build on CKB's already very
good runLogSum function. There were a few structural changes
I made here to be more speed-ascension-relevant. I used my
own Python parser for the skeleton of the overall build &
CKB's parser to help me understand proper ASH text parsing

RunLogSum.ash by ckb1
|--- https://kolmafia.us/showthread.php?22963-RunLogSummary

Run-Log-Parser by Captain Scotch
|--- https://github.com/docrostov/KOL-Log-Parser/

==============================================================

```TO-DO LIST ~~~~~~~~~~~~~~~~~~~~~~~~~
==============================================================
  - Figure out a way to sort the runReport's loc/fam output
  - Add handling for between-turn stuff I want to snag
      |-- Bastille is a main thing here
  - Add handling for things I want to actually remove
      |-- Beachcombing data; pretty unnecessary
      |-- Resting data, I think?
  - Create a relay overlay
  - Support for different usernames

==============================================================
~~~~~~~~~~~~~~~~~~~~~~~~ KNOWN ISSUES ~~~~~~~~~~~~~~~~~~~~~~~~
==============================================================
  - When multiple heists happen in the same turn, it doesn't increment the items dropped properly though it does increment heist usage the fam log
  - Monsters macro'd into still have "a" & "!" next to their names
  - Due to how session_logs() works, I have no way of capturing days where someone didn't open mafia.
  - I have -no- idea how, but the loc/fam summaries appear to be missing exactly 4 turns on every run. >:|
==============================================================
```
