"use client";

import { useActionState, useRef, useState } from "react";
import { saveBusinessDraft, type BusinessFormState } from "./actions";

const initialState: BusinessFormState = {};

export function BusinessForm() {
  const [step, setStep] = useState(1);
  const [state, formAction, pending] = useActionState(saveBusinessDraft, initialState);
  const firstStepRef = useRef<HTMLFieldSetElement>(null);
  const secondStepRef = useRef<HTMLFieldSetElement>(null);
  const thirdStepRef = useRef<HTMLFieldSetElement>(null);
  const error = (name: string) => state.fieldErrors?.[name];
  const nextStep = () => {
    const currentFieldset = step === 1 ? firstStepRef.current : step === 2 ? secondStepRef.current : thirdStepRef.current;
    const controls = currentFieldset?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea") ?? [];
    if ([...controls].every((control) => control.reportValidity())) setStep((current) => Math.min(3, current + 1));
  };

  return (
    <form className="business-form" action={formAction}>
      <input type="hidden" name="siteId" value={state.siteId ?? ""} />
      <div className="step-indicator" aria-label={`전체 3단계 중 ${step}단계`}>
        {[1, 2, 3].map((number) => <span className={number <= step ? "active" : ""} key={number}>{number}</span>)}
      </div>

      <fieldset ref={firstStepRef} hidden={step !== 1}>
        <legend>1. 사업 기본정보</legend>
        <label>사업명<input name="businessName" required minLength={2} aria-invalid={Boolean(error("businessName"))} /></label>
        {error("businessName") && <p className="field-error">{error("businessName")}</p>}
        <label>업종<select name="industry" required defaultValue=""><option value="" disabled>업종 선택</option><option>기업·전문서비스</option><option>음식점·카페</option><option>병원·의료</option><option>교육</option><option>쇼핑·판매</option><option>기타</option></select></label>
        {error("industry") && <p className="field-error">{error("industry")}</p>}
        <label>핵심 서비스<textarea name="coreService" required minLength={5} rows={4} placeholder="고객에게 제공하는 핵심 서비스를 입력하세요." /></label>
        {error("coreService") && <p className="field-error">{error("coreService")}</p>}
      </fieldset>

      <fieldset ref={secondStepRef} hidden={step !== 2}>
        <legend>2. 홈페이지 목표</legend>
        <label>홈페이지 목적<textarea name="purpose" required minLength={10} rows={4} placeholder="예: 상담 문의를 늘리고 서비스 신뢰도를 전달하고 싶습니다." /></label>
        {error("purpose") && <p className="field-error">{error("purpose")}</p>}
        <label>주요 고객<textarea name="targetCustomer" required minLength={5} rows={3} placeholder="연령, 지역, 고객의 필요를 적어주세요." /></label>
        {error("targetCustomer") && <p className="field-error">{error("targetCustomer")}</p>}
        <label>원하는 고객 행동<input name="desiredAction" placeholder="예: 상담 신청, 전화 문의, 방문 예약" /></label>
      </fieldset>

      <fieldset ref={thirdStepRef} hidden={step !== 3}>
        <legend>3. 연락처 및 참고자료</legend>
        <label>이메일<input name="contactEmail" type="email" /></label>
        {error("contactEmail") && <p className="field-error">{error("contactEmail")}</p>}
        <label>전화번호<input name="phone" inputMode="tel" /></label>
        <label>주소<input name="address" /></label>
        <label>참고 사이트<textarea name="referenceSites" rows={3} placeholder="사이트 주소와 참고하고 싶은 점을 적어주세요." /></label>
      </fieldset>

      {state.error && <p className="form-message error-message" role="alert">{state.error}</p>}
      {state.success && <p className="form-message success-message" role="status">{state.success}</p>}
      <div className="form-navigation">
        <button type="button" className="secondary-button" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))}>이전</button>
        {step < 3 ? <button type="button" className="primary-action form-button" onClick={nextStep}>다음</button> : <button type="submit" className="primary-action form-button" disabled={pending}>{pending ? "저장 중..." : "임시저장"}</button>}
      </div>
    </form>
  );
}
