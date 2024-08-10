const MemberRepository = require("./memberRepository");
const LoanRepository = require("../loan/loanRepository");

class MemberService {
  constructor() {
    this.memberRepository = new MemberRepository();
    this.loanRepository = new LoanRepository();
  }

  async addMember(memberInfo) {
    return await this.memberRepository.addMember(memberInfo);
  }

  async findByCode(memberCode) {
    return await this.memberRepository.findByCode(memberCode);
  }

  async findAll() {
    // find all members and count the number of loans for each member status_loan = Not Returned
    const members = await this.memberRepository.findAll();
    // Map members to include the count of loans not returned
    const membersWithLoans = await Promise.all(
      members.map(async (member) => {
        const loans = await this.loanRepository.findLoanByMemberCode(
          member.code
        );
        const loansNotReturned = loans.filter(
          (loan) => loan.status_loan === "Not Returned"
        );
        return {
          ...member.toObject(),
          borrowedBook: loansNotReturned.length,
        };
      })
    );
    return await membersWithLoans;
  }

  async updateMember(memberCode, memberInfo) {
    return await this.memberRepository.updateMember(memberCode, memberInfo);
  }

  async removeMember(memberCode) {
    return await this.memberRepository.removeMember(memberCode);
  }
}

module.exports = MemberService;
