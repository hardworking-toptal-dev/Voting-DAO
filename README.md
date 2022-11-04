# Proof of Humanity + Anonymous Voting(WIP)
## Proof of Humanity and Anonymous Voting feature in Nounish DAO
With DAOs rising in popularity a lot of different governance systems have been proposed, developed and tested. Most of them use ER20 token-based voting systems, and with Nouns DAO introducing NFT (ERC721) based voting, increasingly DAOs are adopting the “Nounish” format.

One down side of the auction based NFT mint is the favoring of ETH whales, who can consistently outbid the competition. This leads to the possibility of a 51% attack. Nouns DAO solves this temporarily with the veto system, but it’s not ideal long term. Recently there have been different ideas of limiting the amount of tokens one person can obtain.

Punk4156 on twitter:<br/> 
![Screen](/screen.png?raw=true)
<br/> As referenced by Punk4156, sybil resistant identity could solve this problem to some degree.

For this hackathon we’ve decided to create an implementation of the Proof of Humanity protocol used by Kleros. “Proof of Humanity is a system combining webs of trust, with reverse Turing tests, and dispute resolution to create a sybil-proof list of humans.” (https://www.proofofhumanity.id/). We found this to be the best system suitable for the purpose as of today (among others like Gitcoin Passport, Bright ID etc.)

When changing the core protocol, we wanted to focus on the voting system. The idea is that one person can own multiple tokens, but can only vote with the power of one.
This will need some changes in the NounsDAOLogicV1 contract.
The implementation can be found in the github repository.

Anonymous Voting (an experiment):

The idea of anonymous voting emerged on a lunch break between some members of the Social Nouns team.

Why would we need anonymous voting?

In the real world most elections are done privately. Nobody has to share which options the person has voted for. And this system has a reason, you don't always want to share what opinion you have on a certain topic, but you still want to participate. This could be for political, financial or personal reasons. Adding this to the Nouns protocol could be an interesting experiment.

Great Idea, but what does the implementation look like?

That's the tricky part. On the blockchain everything is public. My vote and the algorithm that calculates the votes. If I wanted to encrypt the vote, everybody could just recreate the same scenario in an Ethereum test network to decrypt my vote. So how can we solve this?

Introducing Zero knowledge proofs and anonymous voting by two-round. In 2017 Patrick McCorry created the first implementation of anonymous voting on Ethereum. Using his work, we started to implement our own version of anonymous voting into the Nouns contracts. This leads to a lot of different challenges which are addressed later and inside the readme file on the Github.


## Implementation:
We have a general dislike for strict rules and predefined systems, so we decided to make both features optional. This changes the creating and voting for proposals a little bit.
The new flow of a proposal looks like this:
![flow](/flow.png?raw=true)
There are two folders in this repo: <br/>
- nouns-contracts-poh
- nouns-contracts-poh-anonymousvoting (WIP)

The nouns-contracts-poh houses the implementation of sybil resistant identity system integration.
The nouns-contracts-poh-anonymousvoting houses the merge of Anonymous voting by Patrick McCorry and the nouns daologic.
There are a lot of bad design choices, will keep fixing them in the future.

## Problems
1. There are not many sybil resistance identity systems that are in wide use.<br/>
2.There are a number of different organizations working on decentralized ID:
  - https://www.proofofhumanity.id/
  - https://community.optimism.io/docs/governance/
  - https://passport.gitcoin.co/ 
  - https://www.brightid.org/ 
  - https://galxe.com/ 

3. Corruption is still possible, even if it gets harder.<br/>
After using POH and an auction based token offering system it is still possible to obtain over 51% of the issued tokens, so this doesn't fix the problem fundamentally. 

4. Gas cost with anonymous voting <br/>
The anonymous voting contract uses elliptic curves to ensure privacy. Ethereum has no native support for this, so the gas costs increase exponentially to the amount of voters.

## Conclusion:
All in all it was a lot of fun to participate in this hackathon, discussing these highly theoretical ideas within the team, community and on Twitter (hopefully we will get on some Web3 social soon).
I hope even if the code is not nearly completed, it still provides a good enough outline.<br/>

If you have any questions please ping me or social nouns on twitter:
Oot2k: https://twitter.com/oot2k1 (Dev) <br/>
Social Nouns: https://twitter.com/socialnouns (social nouns team) <br/>

## References:
https://github.com/Proof-Of-Humanity/Proof-Of-Humanity
https://community.optimism.io/docs/governance/
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8229461/
https://dash.harvard.edu/bitstream/handle/1/37365632/BINSHARUDIN-DOCUMENT-2020.pdf?sequence=1&isAllowed=y
http://homepages.cs.ncl.ac.uk/feng.hao/files/OpenVote_IET.pdf

