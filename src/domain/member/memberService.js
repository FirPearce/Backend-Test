const MemberRepository = require("./memberRepository");

class MemberService {
  constructor() {
    this.memberRepository = new MemberRepository();
  }

  async addMember(memberInfo) {
    return await this.memberRepository.addMember(memberInfo);
  }

  async findByCode(memberCode) {
    return await this.memberRepository.findByCode(memberCode);
  }

  async findAll() {
    return await this.memberRepository.findAll();
  }

  async updateMember(memberCode, memberInfo) {
    return await this.memberRepository.updateMember(memberCode, memberInfo);
  }

  async removeMember(memberCode) {
    return await this.memberRepository.removeMember(memberCode);
  }
}

module.exports = MemberService;
