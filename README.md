# Proof of Humanity + Anonymous Voting
## Proof of Humanity and Anonymous Voting feature in Nounish DAO
With DAOs rising in popularity a lot of different government systems have been tested in different forms.<br/>
Most of them use ER20 Token based voting systems, and with Nouns DAO introducing NFT (ERC721) based voting, a lot of different organizations have adopted the “Nounish” DAO format.<br/>
One down side of the auction based NFT mint is the favoring of ETH whales, who can consistently outbid the competition. This leads to the possibility of a 51% attack.
Nouns DAO solves with the veto system.
Recently there have been different ideas of limiting the amount of tokens one person can obtain.<br/>
Punk4156 on twitter:
![Screen](/screen.png?raw=true)
<br/> As referenced by Punk4156, sybil resistant identity could solve this problem to some degree.

For this hackathon I decided to create an implementation of the proof of humanity protocol used by Kleros.
“Proof of Humanity, a system combining webs of trust, with reverse Turing tests, and dispute resolution to create a sybil-proof list of humans.” (https://www.proofofhumanity.id/)
I found this to be the best system as of today.

When changing the core protocol, I wanted to focus on the voting system. The idea is that one person can own multiple tokens, but can only vote with the power of one.
This will need some changes in the NounsDAOLogicV1 contract.<br/>
The implementation can be found in the github repository.

Anonymous Voting (an experiment):

The idea of anonymous voting emerged on a lunch break between some members of the social nouns team.
Why would we need anonymous voting?
In the real world most elections are done privately. Nobody has to share which options the person has voted for. And this system has a reason, you don't always want to share what opinion you have on a certain topic, but you still want to participate. This could be for political, financial or personal reasons. Adding this to the nouns protocol could be an interesting experiment.<br/>

Great Idea, but what does the implementation look like?
That's the tricky part, on blockchain everything is public, my vote, the algorithm that calculates the votes, and if I wanted to encrypt the vote, everybody could just recreate the same scenario in an ethereum test network to decrypt my vote. So how can we solve this?<br/>

Introducing Zero knowledge proofs and anonymous voting by two-round.<br/>

In 2017 Patrick McCorry created the first implementation of anonymous voting on the ethereum block chain.
Using his work, I started to implement my own version of anonymous voting into the nouns contracts. This leads to a lot of different challenges which are addressed later.

## Implementation:
I don't like strict rules or predefined systems, so I decided to make both features optional.
This changes the creating and voting for proposals a little bit.
The new flow of a proposal looks like this:
![flow](/flow.png?raw=true)
Now there are two new questions the creator is being asked:<br/>
Do you want to exclude everyone who has not verified themselves as humans? 
Do you want to create a private proposal?
Creating a private proposal will also add one extra step, the registration phase. This is the key point of 2 phase anonymous voting.
The implementation can be found in this github repo.

## Problems
1. There is not one good Proof of Humanity/ sybil resistance identity system.<br/>
There are a lot of different organizations that try to provide some form of identification on blockchain, (https://www.proofofhumanity.id/) being maybe the most popular.
The Optimism Collective are currently working on a new Citizen ship concept, but at this time it is only a concept. (https://community.optimism.io/docs/governance/)

2. Corruption is still possible, even if it gets harder.<br/>
After using POH and an auction based token offering system it is still possible to obtain over 51% of the issued tokens, so this doesn't fix the problem fundamentally. 

3. Gas cost with anonymous voting <br/>
The anonymous voting contract uses elliptic curves to ensure privacy. Ethereum has no native support for this, so the gas costs increase exponentially to the amount of voters.

## Conclusion:
All in all it was a lot of fun to participate in this hackathon, discussing these highly theoretical ideas with the team and on twitter (hopefully we will get on some Web3 social soon).
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

