const MemberRepository = require("./memberRepository");

class MemberService {
  constructor() {
    this.memberRepository = new MemberRepository();
  }

  async addMember(memberInfo) {
    return this.memberRepository.addMember(memberInfo);
  }

  async findByCode(memberCode) {
    return this.memberRepository.findByCode(memberCode);
  }

  async findAll() {
    return this.memberRepository.findAll();
  }

  async updateMember(memberCode, memberInfo) {
    return this.memberRepository.updateMember(memberCode, memberInfo);
  }

  async removeMember(memberCode) {
    return this.memberRepository.removeMember(memberCode);
  }
}

module.exports = MemberService;
